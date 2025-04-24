import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import logoImage from "../assets/Logo.png";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const engineers = [
  "Abdullah Al Amri", "Ibraheem Al Kindi", "Khalid Al Balushi", "Khalid Al Fari", "Mahmood Aljasasi",
  "Moayad Gamal", "Saif Al Yahyaai", "Salman Al Riyami", "Sultan Al Yaarabi", "Yaqoob Al Noumani"
];

export default function SchedulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const docRef = doc(db, "schedules", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSchedule(docSnap.data());
        } else {
          const empty = {};
          days.forEach((day) => {
            empty[day] = {};
            engineers.forEach((eng) => {
              empty[day][eng] = "";
            });
          });
          await setDoc(docRef, empty);
          setSchedule(empty);
        }
      } catch (error) {
        console.error("Error fetching schedule:", error);
        alert("Error loading schedule.");
      }
    };

    fetchSchedule();
  }, []);

  const handleChange = (day, engineer, value) => {
    const updated = { ...schedule };
    updated[day][engineer] = value;
    setSchedule(updated);
  };

  const saveSchedule = async () => {
    try {
      await setDoc(doc(db, "schedules", "main"), schedule);
      alert("Schedule saved!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save schedule.");
    }
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Team Schedule");

    const columns = ["Engineer", ...days];
    sheet.columns = columns.map(col => ({ header: col, key: col }));

    engineers.forEach((eng) => {
      const row = { Engineer: eng };
      days.forEach((day) => {
        row[day] = schedule[day][eng];
      });
      sheet.addRow(row);
    });

    sheet.eachRow((row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = { bold: true };

        if (rowNumber === 1) {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF00796B" },
          };
          cell.font = { color: { argb: "FFFFFFFF" } };
        } else if (colNumber > 1) {
          const value = cell.value;
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: value ? "FFF44336" : "FF66BB6A" },
          };
          cell.font = { color: { argb: "FFFFFFFF" } };
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "TeamScheduleStyled.xlsx");
  };

  if (!schedule) {
    return <p style={{ padding: "2rem", fontWeight: "bold" }}>Loading schedule...</p>;
  }

  return (
    <div style={{ backgroundColor: "#e0f7fa", minHeight: "100vh", padding: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logoImage} alt="Logo" style={{ height: "60px" }} />
        <div>
          <button onClick={() => navigate("/")} style={topButtonStyle}>Home</button>
          <button onClick={exportToExcel} style={topButtonStyle}>Export to Excel</button>
          {(user?.role === "admin" || user?.role === "manager") && (
            <button onClick={saveSchedule} style={topButtonStyle}>Save Schedule</button>
          )}
        </div>
      </div>

      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: "1rem 0" }}>Team Schedule</h2>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={headerStyle}>Engineer</th>
            {days.map((day) => (
              <th key={day} style={headerStyle}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {engineers.map((engineer) => (
            <tr key={engineer}>
              <td style={headerStyle}>{engineer}</td>
              {days.map((day) => (
                <td key={day}>
                  {["admin", "manager"].includes(user?.role) ? (
                    <input
                      type="text"
                      value={schedule[day][engineer]}
                      onChange={(e) => handleChange(day, engineer, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        backgroundColor: schedule[day][engineer] ? "#f44336" : "#66bb6a",
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                        borderRadius: "4px",
                      }}
                    />
                  ) : (
                    <span style={{
                      display: "block",
                      padding: "0.5rem",
                      backgroundColor: schedule[day][engineer] ? "#f44336" : "#66bb6a",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRadius: "4px",
                    }}>
                      {schedule[day][engineer]}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const headerStyle = {
  backgroundColor: "#00796b",
  color: "white",
  padding: "0.75rem",
  textAlign: "center",
  fontWeight: "bold",
};

const topButtonStyle = {
  marginLeft: "10px",
  backgroundColor: "#00796b",
  color: "white",
  padding: "0.5rem 1rem",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
