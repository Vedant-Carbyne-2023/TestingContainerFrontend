import React, { useState } from 'react'
import {BiRadioCircle, BiRadioCircleMarked} from 'react-icons/bi'
// import {IoRadiobuttonOff} from 'react-icons/io'
export default function OfficeAdd() {
    const [officeAdd, setOfficeAdd] = useState(false)
  return (
    <div>
   <div className="form-group">
  <label htmlFor="officeAddress" className="form-label">
    Office Address (If Not Same As Registered Address)
  </label>
  <div className="input-group p-0 m-0">
    <input
      type="text"
      className="form-control"
      id="officeAddress"
      placeholder="Enter Office Address"
      name="officeAddress"
      disabled={!officeAdd}
    />
    <button
      className="btn btn-outline-secondary"
      type="button"
      onClick={() => setOfficeAdd(!officeAdd)}
    >
      {officeAdd ? (
        <BiRadioCircleMarked title="Office Address" />
      ) : (
        < BiRadioCircle title="Click to Add Address" />
      )}
    </button>
  </div>
</div>
</div>
  )
}
