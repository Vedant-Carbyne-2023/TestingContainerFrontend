import React, { useState } from 'react'


export default function PanDetails() {
    const [panNumber, setPanNumber] = useState("")
    


  


  return (
<>      <div className="form-group">
      <label htmlFor="panNumber">Pan Number</label>

      <div className="input-wrapper">
  <input
    variant="standard"
    className="mb-3 form-control"
    placeholder="Enter Pan Number"
    type="text"
    name="panNumber"
    value={panNumber.toUpperCase()}
    size="medium"
    onChange={(e) => setPanNumber(e.target.value)}
  />
  
</div>

      <input
                className="form-control"
                type="file"
                id="pan_front"
                
                name="pan_front"
              />
           
   
  </div>
  </>
  )
}
