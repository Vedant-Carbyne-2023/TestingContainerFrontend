import React, { useState } from 'react'
import Hydrotest from './Hydrotest';
import JMR from './JMR';
import ShowTable from './ShowTable';

export default function CombineFile() {
    const [selectedComponent, setSelectedComponent] = useState(<ShowTable />); // Set JMR as the default component

  return (
    <div>
      <div style={{display:'flex',justifyContent:"center"}} className='mt-3'>
        <button className='btn' onClick={() => setSelectedComponent(<ShowTable />)}>ShowTable</button>
        <button className='btn' onClick={() => setSelectedComponent(<JMR />)}>JMR</button>
        <button className='btn' onClick={() => setSelectedComponent(<Hydrotest />)}>Hydrotest</button>
      </div>
      <div>
        {/* Render the selected component based on state */}
        {selectedComponent}
      </div>
    </div>
  );
}
