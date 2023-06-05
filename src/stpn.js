import React from "react";

const Stopien = () => {
    const [rows, setRows] = React.useState([]);

    const mapToTableRow = React.useCallback(row => {
        const cells = row.split(",");
        const stopien = cells[7];
        return (
            <tr>{stopien}</tr>
        );
    }, []);

    React.useEffect(() => {
        const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSP8edhewJtAiYJ4E3Mc2DSq_3YGIU9uT1KzfTuCQi87l6Qv6b5VmchkJkR2KC0mapIFGmBdmLYskm6/pub?gid=0&single=true&output=csv";
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                setRows(data.split("\n"));
            });
    }, []);

    return (
        <table>
            {rows.map(row => mapToTableRow(row))}
        </table>
    );
}

export default Stopien;