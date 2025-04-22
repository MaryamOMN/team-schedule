import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import logoImage from "../assets/Logo.png";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const engineers = [
  "Abdullah Al Amri", "Ibraheem Al Kindi", "Khalid Al Balushi", "Khalid Al Fari", "Mahmood Aljasasi",
  "Moayad Gamal", "Saif Al Yahyaai", "Salman Al Riyami", "Sultan Al Yaarabi", "Yaqoob Al Noumani"
];

export default function SchedulePage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState(() =>
    days.map(() => engineers.map(() => ""))
  );

  const handleChange = (dayIdx, engIdx, value) => {
    const newSchedule = [...schedule];
    newSchedule[dayIdx][engIdx] = value;
    setSchedule(newSchedule);
  };

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Team Schedule");

    const columns = ["Engineer", ...days];
    sheet.columns = columns.map(col => ({ header: col, key: col }));

    engineers.forEach((eng, engIdx) => {
      const row = { Engineer: eng };
      days.forEach((day, dayIdx) => {
        row[day] = schedule[dayIdx][engIdx];
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
          cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
        } else {
          const dayKey = columns[colNumber - 1];
          if (colNumber > 1) {
            const value = sheet.getRow(rowNumber).getCell(dayKey).value;
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: value ? "FFF44336" : "FF66BB6A" },
            };
            cell.font = { color: { argb: "FFFFFFFF" }, bold: true };
          }
        }
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "TeamScheduleStyled.xlsx");
  };

  return (
    <div
      style={{
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <img src={logoImage} alt="Logo" style={{ height: "60px" }} />
        <div>
          <button onClick={() => navigate("/")} style={topButtonStyle}>Home</button>
          <button onClick={exportToExcel} style={topButtonStyle}>Export to Excel</button>
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
          {engineers.map((engineer, engIdx) => (
            <tr key={engineer}>
              <td style={headerStyle}>{engineer}</td>
              {days.map((_, dayIdx) => (
                <td key={dayIdx}>
                  {user.role === "admin" || user.role === "manager" ? (
                    <input
                      type="text"
                      value={schedule[dayIdx][engIdx]}
                      onChange={(e) => handleChange(dayIdx, engIdx, e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem",
                        border: "1px solid #ccc",
                        backgroundColor: schedule[dayIdx][engIdx] ? "#f44336" : "#66bb6a",
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
                      backgroundColor: schedule[dayIdx][engIdx] ? "#f44336" : "#66bb6a",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      borderRadius: "4px",
                    }}>
                      {schedule[dayIdx][engIdx]}
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
