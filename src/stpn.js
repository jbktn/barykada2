import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.svg";

const Stopien = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("userID="))
        ?.split("=")[1];

      if (id === undefined) {
        navigate("/login");
        return;
      }

      var url =
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSP8edhewJtAiYJ4E3Mc2DSq_3YGIU9uT1KzfTuCQi87l6Qv6b5VmchkJkR2KC0mapIFGmBdmLYskm6/pub?gid=0&single=true&output=csv";

      try {
        const data = await $.get(url);
        const rows = data.split("\n");

        for (let i = 0; i < rows.length; i++) {
          const cells = rows[i].split(",");

          if ((cells[0] + cells[1]).toLowerCase() === id.toLowerCase()) {
            const stopien = cells[7];

            switch (stopien) {
              case "młodzik":
                url =
                  "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=0&single=true&output=tsv";

                $.get(url, function (data) {
                  var rows = data.split("\n");
                  var table = [];

                  var columnId = 0;

                  // Szukanie kolumny z wartością "jan" w pierwszym wierszu
                  var headerCells = rows[0].split("\t");
                  for (var j = 0; j < headerCells.length; j++) {
                    if (
                      headerCells[j].toLowerCase().replace(/\s/g, "") === id
                    ) {
                      columnId = j;
                      break;
                    }
                  }

                  for (var i = 1; i < rows.length; i++) {
                    var cells = rows[i].split("\t");
                    var row = [];

                    var indexCell = i + ". "; // Dodawanie numeracji
                    row.push(indexCell);

                    var cell = cells[0]; // Wyświetlanie tylko pierwszej kolumny
                    row.push(cell);

                    var checkboxCell = (                      
                        <input
                          type="checkbox"                          
                          disabled={true}
                          defaultChecked={cells[columnId] === "TRUE"}
                          
                        />
                      
                    );      
                    row.push(checkboxCell);

                    table.push(row);
                  }

                  setTableData(table);
                });

                break;
              case "wywiadowca":
                break;
              case "ćwik":
                console.log("ćwik");
                break;
              case "HO":
                console.log("HO");
                break;
              case "HR":
                console.log("HR");
                break;
              default:
                console.log("default");
                break;
            }

            break; // Przerwij pętlę po znalezieniu odpowiedniego wiersza
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate]);

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
        <div>
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
    </div>
  );
};

export default Stopien;
