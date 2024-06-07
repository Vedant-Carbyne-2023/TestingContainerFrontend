import React, { useEffect, useState } from 'react'
import Inward from './Inward';
import Outward from './Outward';

export default function Common({projectId, itemSelected}) {

    const [item, setItem] = useState('')
    const [activeComponent, setActiveComponent] = useState(
        "Stock Inward"
      );

    const handleComponentAClick = () => {
      setActiveComponent('Stock Inward');
    };
  
    const handleComponentBClick = () => {
        setActiveComponent('Stock Outward');
    };

    useEffect(() => {
      setItem(itemSelected)
    }, [itemSelected])
    

  return (
    <div>
        <div className='col d-flex' style={{justifyContent:"space-around"}}>
        <button
            className={`btn ${
              activeComponent === "Stock Inward" ? "active" : ""
            }`}

            type='button' onClick={handleComponentAClick}>
            
        Stock Inward</button>

        <button
            className={`btn ${
              activeComponent === "Stock Outward" ? "active" : ""
            }`}

            type='button' onClick={handleComponentBClick}>
            
        Stock Outward</button>
      </div>
      <div>
        {/* Conditionally render the selected component */}
        { item && activeComponent === 'Stock Inward' && <Inward projectId={projectId} itemSelected={item}/>}
        {item && activeComponent === 'Stock Outward' && <Outward projectId={projectId} itemSelected={item}/>}
      </div>
    </div>
  )
}
