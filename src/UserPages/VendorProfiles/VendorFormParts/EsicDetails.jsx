import React, { useState } from 'react';

function EsicRegistration() {
  const [hasESICRegistration, setHasESICRegistration] = useState(true);

  return (
    <div className="form-group">
      
      <label htmlFor="esicRegistrationNumber">
        ESIC Registration Number
      </label>

     
      <input
        className="form-control"
        type="text"
        // required
        id="esicRegistrationNumber"
        placeholder="Enter ESIC Registration Number"
        name="esicRegistrationNumber"
        disabled={!hasESICRegistration}
      />
      <label>Select Esic Registration Image</label>
      <input
        className="form-control"
        type="file"
        // required
        id="esic_number"
        placeholder="Select ESIC Registration File"
        name="esic_number"
        disabled={!hasESICRegistration}
      />
    </div>
  );
}

export default EsicRegistration;
