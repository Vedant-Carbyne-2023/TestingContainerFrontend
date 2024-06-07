import React, { useState } from 'react'
import Hydrotest from './Hydrotest';
import JMR from './JMR';
import UserNavbar from '../../CommonUtitlites/UserNavbar/UserNavbar';
import JmrTable from './JmrTable';
import HydroTestTable from './HydroTestTable';

export default function ShowTable() {
    const [selectedComponent, setSelectedComponent] = useState(<JmrTable />); // Set JMR as the default component

  return (
    <div>
        {/* <UserNavbar/> */}
      
      <div style={{display:'flex',justifyContent:"center"}} className='mt-3'>
        <button className='btn' onClick={() => setSelectedComponent(<JmrTable />)}>JMR</button>
        <button className='btn' onClick={() => setSelectedComponent(<HydroTestTable />)}>Hydrotest</button>
      </div>
      <div>
        {/* Render the selected component based on state */}
        {selectedComponent}
      </div>


    </div>
  );
}
