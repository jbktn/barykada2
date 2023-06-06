import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import logo from "./logo.svg";

const Sprawnosci = () => {
  const [tableData, setTableData] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQGUIajhJMZF7i_8Bx_wEeVhMLM4r4mClpHB9psGgfmL7yzW2o-P5Kt8KElSMBjl7H4RSpYT5OR1tti/pub?gid=0&single=true&output=csv";

      const id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userID="))
        ?.split("=")[1];

      if (id === undefined) {
        navigate("/login");
        return;
      }

      try {
        const data = await $.get(url);
        const rows = data.split("\n");

        const filteredRows = rows.filter((row, index) => {
          if (index === 0) return false; // Skip header row
          const cells = row.split(",");
          return (cells[0] + cells[1]).toLowerCase() === id.toLowerCase();
        });

        const tableData = filteredRows.map((row) => row.split(",").slice(2, -1));

        setTableData(tableData);
        setFetchingData(false); // Mark fetching as completed
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (fetchingData) {
      fetchData();
    }
  }, [fetchingData, navigate]);

  return (
    <div>
      <header>
        <Link to={`/`}>
          <img className="logo" src={logo} alt="Logo" />
        </Link>
        <nav>
          <ul className="nav__links">
            <li>
              <Link to={`/sprawnosci`}>Sprawności</Link>
            </li>
            <li>
              <Link to={`/stopien`}>Stopień</Link>
            </li>
            <li>
              <Link to={`/login`}>inne</Link>
            </li>
          </ul>
        </nav>
        <div className="second-button">
          <Link to={`/`}>Twój profil</Link>
        </div>
      </header>
      <div className="flex margin-top">
        <table id="arkusz-table">
          {tableData.map((row, index) => (
            <tr key={index}>
              {row.map((cell, index) => (
                <td key={index}>{cell}</td>
              ))}
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default Sprawnosci;
