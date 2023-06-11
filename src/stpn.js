import React, { useEffect, useState } from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import logo from "./images/logo.svg";

const Stopien = () => {
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Pobierz dane z ciasteczka
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
              case "wywiadowca":
                if (stopien === "młodzik") {
                  url =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=0&single=true&output=tsv";
                } else {
                  url =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=53519936&single=true&output=tsv";
                }

                $.get(url, function (data) {
                  var rows = data.split("\n");
                  var table = [];

                  var columnId = 0;

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
                    var cells = rows[i].replace(/\r/g, "").split("\t");
                    var row = [];

                    var indexCell = i + ". "; // Dodawanie numeracji
                    row.push(indexCell);

                    var cell = cells[0]; // Wyświetlanie tylko pierwszej kolumny
                    row.push(cell);

                    var checkbox = cells[columnId] === "TRUE";
                    row.push(checkbox);

                    table.push(row);
                  }

                  setTableData(table);

                  // Zapisz tabelę jako cookie
                  document.cookie = `stopienTable=${JSON.stringify(table)}`;
                });

                break;
              case "ćwik":
              case "HO":
              case "HR":
                if (stopien === "ćwik") {
                  url =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=392764615&single=true&output=tsv";
                } else if (stopien === "HO") {
                  url =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=1499209745&single=true&output=tsv";
                } else {
                  url =
                    "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=1556109590&single=true&output=tsv";
                }

                $.get(url, function (data) {
                  var rows = data.split("\n");
                  var table = [];

                  for (var j = 0; j < rows.length; j++) {
                    if (
                      rows[j].split("\t")[1].toLowerCase().replace(/\s/g, "") === id
                    ) {
                      for (var i = j + 1; i < rows.length; i++) {
                        var cells = rows[i].replace(/\r/g, "").split("\t");
                        if (cells[0] === "") {
                          break;
                        }
                        var row = [];

                        var indexCell = i - j + ". "; // Dodawanie numeracji
                        row.push(indexCell);

                        var cell = cells[0]; // Wyświetlanie tylko pierwszej kolumny
                        row.push(cell);

                        var checkbox = cells[1] === "TRUE";
                        row.push(checkbox);

                        table.push(row);
                      }
                      setTableData(table);

                      // Zapisz tabelę jako cookie
                      document.cookie = `stopienTable=${JSON.stringify(table)}`;

                      break;
                    }
                  }
                });
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

    // Pobierz wartość z cookie
    const tableCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("stopienTable="))
      ?.split("=")[1];

    if (tableCookie) {
      // Jeśli cookie istnieje, sparsuj wartość cookie i ustaw tabelę jako tableData
      const parsedTable = JSON.parse(tableCookie);
      setTableData(parsedTable);
    }
    fetchData();
  }, [navigate]);

  return (
    <div>
      <header>
        <Link to={`/`}>
          <h1 className="logo2">Barykada</h1>
        </Link>
        <nav>
          <ul className="nav__links">
            <li>
              <Link to={`/sprawnosci`}>Sprawności</Link>
            </li>
            <li className="green-text">
              <Link to={`/stopien`}>Stopień</Link>
            </li>
            <li>
              <Link to={`/login`}>Wyloguj</Link>
            </li>
          </ul>
        </nav>
        <div className="second-button">
          <Link to={`/`}>Twój profil</Link>
        </div>
      </header>
      <div className="flex margin-top">
        <div className="width-60">
          <table id="arkusz-table">
            <tbody>
            {tableData.map((row, index) => (
              <tr key={index}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>
                    {cellIndex === 2 ? (
                      <input
                        type="checkbox"
                        disabled={true}
                        checked={cell}
                      />
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Stopien;
