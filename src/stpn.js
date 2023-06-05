import React from "react";
import Papa from 'papaparse';

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
            .then(data => {
                console.log(data)
                setRows(data.split(''));
            });
    }, []);

    return (
        <div>
            <h1 className="py-2 px-2 text-white font-semibold text-2xl text-border-green bot-border">
                40 KDH Barykada
            </h1>
            <div className="h-100vh flex text-white bg-green-900 items-center justify-center">
                <div>
                    <table>
                        {rows.map(row => mapToTableRow(row))}
                    </table>
                </div>
            </div>
        </div>

    );
}

export default Stopien;