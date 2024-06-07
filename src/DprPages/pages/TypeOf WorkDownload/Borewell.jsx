import React, { useState, useEffect } from 'react';
import ExcelJS from 'exceljs';
import { api } from '../../functions/axiosDefault';
import moment from 'moment';


const Borewell = ({ month, year }) => {
    // const [data, setData] = useState([]);
    const [borewellData, setBorewellData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post('/getBorewellDprAll');
                const responseData = response.data.data;
                console.log("API DATA", responseData);
                // console.log("API DATA", responseData.borewellDpr.dprDetails);

                setBorewellData(responseData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const generateExcel = async () => {
        let data = await fetchData()

        const selectedMonth = 12; // For November

        // Get the number of days in the selected month
        const daysInMonth = new Date(2023, selectedMonth, 0).getDate();

        // Generate headers based on the number of days in the month
        const headers = ['S. No.', 'Block', 'GP Name', 'Vendor Name', 'Staff Name', 'Dpm Name', 'Date of Machine Shifting'];
        const headers2 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
            const day = index % 4 === 0 ? Math.floor(index / 4) + 1 : '';
            return day === '' ? '' : `${day < 10 ? '0' + day : day}-${selectedMonth < 10 ? '0' + selectedMonth : selectedMonth}-${year}`;
        });
        const headers4 = Array.from({ length: daysInMonth * 4 }, (_, index) => {
            if (index % 4 === 0) {
                return "Start";
            } else if (index % 4 === 1) {
                return "Lowering";
            } else if (index % 4 === 2) {
                return "Gravelling";
            } else {
                return "Remarks";
            }
        });


        const combinedHeaders = [...headers, ...headers2];


        const headers3 = [
            '',
            '',
            '',
            '',
            '',
            '',
            '',



        ];

        const combinedSubHeaders = [...headers3, ...headers4];

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Sheet 1');

        // Add combined headers in a single row
        worksheet.addRow(combinedHeaders);
        worksheet.addRow(combinedSubHeaders);

        // Set column widths and styles
        combinedHeaders.forEach((header, index) => {
            const column = worksheet.getColumn(index + 1);
            worksheet.getColumn(index + 1).alignment = { horizontal: 'center' };
            column.width = 30;
        });

        worksheet.getRow(1).font = { bold: true };

        worksheet.getRow(2).font = { bold: true };

        // Merging cells for the headers
        const getExcelColumnName = (colIndex) => {
            let colName = '';
            while (colIndex > 0) {
                const remainder = colIndex % 26 || 26;
                colName = String.fromCharCode(remainder + 64) + colName;
                colIndex = Math.floor((colIndex - 1) / 26);
            }
            return colName;
        };
        for (let i = 8; i < combinedHeaders.length; i += 4) {
            const startCell = getExcelColumnName(i) + '1';
            const endCell = getExcelColumnName(i + 3) + '1';
            console.log(startCell + ':' + endCell)
            worksheet.mergeCells(startCell + ':' + endCell);
        }


        data.borewellDpr.forEach((rowData, index) => {
            const row = worksheet.addRow([
                index + 1,
                rowData.projectName,
                rowData.gpName,
                rowData.compressorVendorName,
                "", "", "",
            ]);

            if (rowData.borewellDpr) {
                rowData.borewellDpr.forEach((dailyEntry, entryIndex) => {
                    const date = moment(dailyEntry.dprDetails.todaysDate).format('DD-MM-YYYY');
                    const dateIndex = combinedHeaders.indexOf(date);

                    if (dateIndex !== -1) {
                        row.getCell(dateIndex + 1).value = dailyEntry.dprDetails.labourCount;

                        if (dailyEntry.dprDetails.loweringDate !== null) {
                            row.getCell(dateIndex + 2).value = moment(dailyEntry.dprDetails.loweringDate).format('DD-MM-YYYY');
                        } else {
                            row.getCell(dateIndex + 2).value = ""; // Set an empty string or handle it as needed
                        }

                        if (dailyEntry.dprDetails.gravellingDate !== null) {
                            row.getCell(dateIndex + 3).value = moment(dailyEntry.dprDetails.gravellingDate).format('DD-MM-YYYY');
                        } else {
                            row.getCell(dateIndex + 3).value = ""; // Set an empty string or handle it as needed
                        }

                        row.getCell(dateIndex + 4).value = dailyEntry.dprDetails.remarks;
                    }

                });
            }
        });

        const fileName = 'your_excel_file.xlsx';
        await workbook.xlsx.writeBuffer().then((buffer) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            link.click();
        });
    };



    return (
        <div>
            <div style={{ textAlign: 'center' }}>
                <button onClick={generateExcel} className='btn btn-primary'>Download Borewell Excel</button>
            </div>

            <div style={{ width: '100%', overflowX: 'auto', border: '1px solid #000' }}>
                <table style={{ minWidth: '2500px' }} className="table table-bordered">
                    <thead>
                        <tr>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                S.No.
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                Block
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                GP Name
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                Vendor Name
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                Staff Name
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                DPM Name
                            </th>
                            <th rowSpan={1} className="bold-border"style={{ textAlign: 'center' }}>
                                Date of Machine Shifting
                            </th>
                            <th colSpan={3} className="bold-border " style={{ textAlign: 'center' }}>
                                Date of Boring
                            </th>
                            <th colSpan={3} className="bold-border"style={{ textAlign: 'center' }}>

                            </th>
                            <th colSpan={3} className="bold-border"style={{ textAlign: 'center' }}>
                                Compressor
                            </th>
                            <th colSpan={3} className="bold-border"style={{ textAlign: 'center' }}>
                                Op Unit
                            </th>

                        </tr>
                        <tr>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>
                            <th className="bold-border"></th>

                            <th style={{ textAlign: 'center' }}>Start</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Reason</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Finish</th>

                            <th style={{ textAlign: 'center' }}>Lowering</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Reason</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Gravel Packing</th>

                            <th style={{ textAlign: 'center' }}>Start </th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Reason</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Finish</th>

                            <th style={{ textAlign: 'center' }}>Start</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Reason</th>
                            <th className="bold-border" style={{ textAlign: 'center' }}>Finish</th>

                        </tr>

                    </thead>
                    <tbody>
                        {borewellData.map((rowData, index) => (
                            <tr key={index}>
                                <td >{index + 1}</td>
                                <td >{rowData.projectName}</td>
                                <td>{rowData.gpName}</td>
                                <td>{rowData.drillingVendorName}</td>
                                <td>{rowData.staffName}</td>
                                <td>{rowData.dpmName? rowData.dpmName: " Md Saleem"}</td>
                                <td>{rowData.dateOfShifting}</td>


                                {/* Date of Boring */}
                                <td >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates[0]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates.length > 0
                                        ? rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates[0]?.reason
                                        : ''
                                    }
                                </td>
                                <td >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.drillingDates[1]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>

                                {/* Lowering */}
                                <td >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.loweringDate
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.loweringDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>
                                <td  >{/* Reason (if available) */}</td>
                                <td >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.gravellingDate
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.gravellingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>
                                {/* Compressor */}
                                <td >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates[0]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates.length > 0
                                        ? rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates[0]?.reason
                                        : ''
                                    }
                                </td>
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.compressorDates[1]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>

                                {/* Op Unit */}
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates[0]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates.length > 0
                                        ? rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates[0]?.reason
                                        : ''
                                    }
                                </td>
                                <td  >
                                    {rowData.borewellDpr && rowData.borewellDpr.length > 0 &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates &&
                                        rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates.length > 0
                                        ? moment(rowData.borewellDpr[rowData.borewellDpr.length - 1].dprDetails.opUnitDates[1]?.workingDate).format('DD-MM-YYYY')
                                        : ''
                                    }
                                </td>



                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Borewell;
