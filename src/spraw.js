import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

const Sprawnosci = () => {  
  const [tableData, setTableData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGUIajhJMZF7i_8Bx_wEeVhMLM4r4mClpHB9psGgfmL7yzW2o-P5Kt8KElSMBjl7H4RSpYT5OR1tti/pub?gid=0&single=true&output=csv";
      
      try {
        const data = await $.get(url);
        const rows = data.split("\n");

        const id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userID="))
        ?.split("=")[1];

        const filteredRows = rows.filter((row, index) => {
          if (index === 0) return false; // Skip header row
          const cells = row.split(",");
          return (cells[0] + cells[1]).toLowerCase() === id.toLowerCase();
        });

        const tableData = filteredRows.map((row) => row.split(",").slice(2, -1));

        setTableData(tableData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1 className="py-2 px-2 text-white font-semibold text-2xl text-border-green bot-border">
      <Link                
          to={`/`}
        >
          40 KDH Barykada
        </Link>
      </h1>
      <div className="h-100vh flex text-white bg-green-900 items-center justify-center">
        <table id="arkusz-table">
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sprawnosci;
