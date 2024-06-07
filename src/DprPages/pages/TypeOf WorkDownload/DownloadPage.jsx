import React, { useState } from 'react'
import Fhtc from './Fhtc';
import Oht from './Oht';
import Pipe from './Pipe';
import BoundaryWall from './BoundaryWall';
import PumpHouse from './PumpHouse';
import Borewell from './Borewell';

export default function DownloadPage() {
  const currentYear = new Date(2023, 0, 1).getFullYear();
  const endYear = 2024; // Change this value if you want a different end year
  const years = Array.from({ length: endYear - currentYear + 1 }, (_, index) => currentYear + index);
  const months = Array.from({ length: 12 }, (_, index) => index + 1);

  const [selectedMonth, setSelectedMonth] = useState(1); // Default to January
  const [selectedYear, setSelectedYear] = useState(currentYear); // Default to current year
  const [typeOfWork, setTypeOfWork] = useState("Pipe"); // Default to current year

  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value, 10));
  };

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value, 10));
  };
  const handleTypeOfWorkChange = (event) => {
    setTypeOfWork(event.target.value);
  };

  return (
    <div className='row'>

<div className="row justify-content-center">
    <div className="col-md-6">
        <div className="d-flex align-items-center justify-content-between p-3">
            <div className="me-2">
                <label htmlFor="month">Month:</label>
                <select id="month" value={selectedMonth} className='form-select' onChange={handleMonthChange}>
                    {months.map((month) => (
                        <option key={month} value={month}>
                            {new Date(2021, month - 1, 1).toLocaleString('default', { month: 'long' })}
                        </option>
                    ))}
                </select>
            </div>

            <div className="me-2">
                <label htmlFor="year">Year:</label>
                <select id="year" value={selectedYear} className='form-select' onChange={handleYearChange}>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>

            <div className="me-2">
                <label htmlFor="typeOfWork">Type Of Work:</label>
                <select id="year" value={typeOfWork} className='form-select' onChange={handleTypeOfWorkChange}>
                    <option value={"Pipe"}>Pipe</option>
                    <option value={"Fhtc"}>Fhtc</option>
                    <option value={"Oht"}>Oht</option>
                    <option value={"BoundaryWall"}>Boundary Wall</option>
                    <option value={"PumpHouse"}>Pump House</option>
                    <option value={"Borewell"}>Borewell</option>
                </select>
            </div>

            <button className='btn btn-primary'>Fetch All Data</button>
        </div>
    </div>
</div>


      <div className="row">
        {
          typeOfWork
            &&
            typeOfWork === "Pipe" ?
            <Pipe month={selectedMonth} year={selectedYear} />
            : typeOfWork === "Fhtc" ?
              <Fhtc month={selectedMonth} year={selectedYear} />
              : typeOfWork === "Oht" ?
                <Oht month={selectedMonth} year={selectedYear} />
                : typeOfWork === "BoundaryWall" ?
                  <BoundaryWall month={selectedMonth} year={selectedYear} />
                  : typeOfWork === "PumpHouse" ?
                    <PumpHouse month={selectedMonth} year={selectedYear} />
                    :
                    <Borewell month={selectedMonth} year={selectedYear} />


        }


      </div>

    </div>
  )
}
