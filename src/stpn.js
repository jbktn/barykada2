import React, { useEffect } from "react";
import $ from "jquery";

const Stopien = () => {
    
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchValue = urlParams.get("search");
    let id = "";    
    if (searchValue !== null) {
      id = searchValue;
    }

    var url =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSP8edhewJtAiYJ4E3Mc2DSq_3YGIU9uT1KzfTuCQi87l6Qv6b5VmchkJkR2KC0mapIFGmBdmLYskm6/pub?gid=0&single=true&output=csv";

    $.get(url, function (data) {
      const rows = data.split("\n");

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].split(",");
        
        if ((cells[0] + cells[1]).toLowerCase() === id.toLowerCase()) {
          const stopien = cells[7];

          switch (stopien) {
            case "młodzik":                 
                url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSO1qr7jgXJwDrd5nGBUsLMf_R6pbcPYS2ZOtMchUt9msDnFVIhxTZkSofR5FxNkNWHNDEluG1vRapk/pub?gid=0&single=true&output=tsv";

                $.get(url, function(data) {
                var rows = data.split("\n");
                var table = $("#arkusz-table");                
                
                var columnId = 0;
                
                // Szukanie kolumny z wartością "jan" w pierwszym wierszu
                var headerCells = rows[0].split("\t");
                for (var j = 0; j < headerCells.length; j++) {
                    if (headerCells[j].toLowerCase().replace(/\s/g, "") === id) {
                    columnId = j;
                    break;
                    }
                }
                
                for (var i = 1; i < rows.length; i++) {
                    var cells = rows[i].split("\t");
                    var row = $("<tr></tr>");
                
                    var indexCell = $("<td></td>").text(i + ". "); // Dodawanie numeracji
                    row.append(indexCell);
                
                    var cell = $("<td></td>").text(cells[0]); // Wyświetlanie tylko pierwszej kolumny
                    row.append(cell);
                
                    var checkboxCell = $("<td></td>");
                    var checkbox = $("<input>").attr("type", "checkbox");
                
                    
                    if (cells[columnId] === "TRUE") {
                    checkbox.prop("checked", true);
                    } else {
                    checkbox.prop("checked", false);
                    }
                
                    checkboxCell.append(checkbox);
                    row.append(checkboxCell);
                
                    table.append(row);
                }
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
    });
  }, []);

  return (
    <div>
      <h1 className="py-2 px-2 text-white font-semibold text-2xl text-border-green bot-border">
        40 KDH Barykada
      </h1>
      <div className="h-100vh flex text-white bg-green-900 items-center justify-center">
        <div>
          <table id="arkusz-table"></table>
        </div>
      </div>
    </div>
  );
};

export default Stopien;
