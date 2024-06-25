import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';

export default function AddInventory() {
  // State variables to store form data
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API
      const response = await api.post('inventory-inward/inward', {
        itemId,
        name,
        quantity
      });

      // Handle successful response (if needed)
    //   console.log('Inventory added:', response.data);
      Swal.fire({
        title:response.data.message,
        timer:2000,
        icon:'success'
      })

      // Clear form fields after successful submission
      setItemId('');
      setName('');
      setQuantity('');
    } catch (error) {
      // Handle error
      console.error('Error adding inventory:', error);
      Swal.fire({
        title:"Error Occured",
        timer:2000,
        icon:'error'
      })
    }
  };

  return (
    <div>
      {/* <h2>Add Inventory</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemId">Item ID:</label>
          <input
            type="text"
             className='form-control'
            id="itemId"
            value={itemId}
            placeholder='Item/Item(Number)'
            onChange={(e) => setItemId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
             className='form-control'
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
             className='form-control'
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit" className='btn btn-primary mt-3'>Submit</button>
      </form>
    </div>
  );
}
