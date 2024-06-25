import React, { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import CustomModal from '../../CommonUtitlites/ModalPopUp/CustomModal';
import AddInventory from './AddInventory';
import ReduceInventory from './ReduceInventory';

const InventoryManagement = () => {
    const [inventoryUpdates, setInventoryUpdates] = useState([]);

    useEffect(() => {
        const ws = new ReconnectingWebSocket('wss://testing.graphyne.in/ws');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            const message = event.data;
            // console.log('WebSocket message received:', message);
console.log(JSON.parse(message))
            setInventoryUpdates(JSON.parse(message));
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        return () => {
            ws.close();
        };
    }, []);

    console.log(inventoryUpdates)
    const [addInventory, setAddInventory] = useState(false)
    const [reduceInventory, setReduceInventory] = useState(false)

    return (
        <div>
            <button className='btn btn-primary' onClick={()=>setAddInventory(true)}>Add Inventory</button>
            <button className='btn btn-primary' onClick={()=>setReduceInventory(true)}>Reduce Inventory</button>
            <h1>InventoryManagement Updates</h1>
            <table className="table">
      <thead>
        <tr>    
          <th scope="col">Item ID</th>
          <th scope="col">Name</th>
          <th scope="col">Quantity</th>
        </tr>
      </thead>
      <tbody>
        {inventoryUpdates.map((update, index) => (
          <tr key={index}>
            <td>{update.itemId}</td>
            <td>{update.name}</td>
            <td>{update.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>

        

        <CustomModal
        title={"Add Inventory"}
        isOpen={addInventory}
        onClose={()=>setAddInventory(false)}
        >
            <AddInventory/>
        </CustomModal>
        <CustomModal
        title={"Reduce Inventory"}
        isOpen={reduceInventory}
        onClose={()=>setReduceInventory(false)}
        >
            <ReduceInventory/>
        </CustomModal>
        </div>
    );
};

export default InventoryManagement;
