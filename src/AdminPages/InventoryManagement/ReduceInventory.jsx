import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';

export default function ReduceInventory() {
  // State variables to store form data
  const [itemId, setItemId] = useState('');
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API
      const response = await api.post('inventory-outward/outward', {
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
        title:error.response.data.message||"Error Occured",
        timer:2000,
        icon:'error'
      })
    }
  };

  return (
    <div>
      {/* <h2>Reduce Inventory/</h2> */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="itemId">Item ID:</label>
          <input
          className='form-control'
            type="text"
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
           className='form-control'
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
           className='form-control'
            type="number"
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
