import React, { useState } from 'react';

function PfRegistration() {
  const [hasPFRegistration, setHasPFRegistration] = useState(true);

  return (
    <div className="form-group">
     
      <label htmlFor="pfRegistrationNumber">
        PF Registration Number
      </label>
      
      <input
        className="form-control"
        type="text"
        required
        id="pfRegistrationNumber"
        placeholder="Enter PF Registration Number"
        name="pfRegistrationNumber"
        disabled={!hasPFRegistration}
      />

<label>Select Pf Registration Image</label>
      <input
        className="form-control"
        type="file"
        required
        id="pf_number"
        placeholder="Select Pf Registration File"
        name="pf_number"
        disabled={!hasPFRegistration}
      />
    </div>
  );
}

export default PfRegistration;
