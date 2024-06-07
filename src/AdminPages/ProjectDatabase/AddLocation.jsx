import React, { useState } from 'react'
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
export default function AddLocation({setStatus}) {
  const [locationName, setLocationName] = useState("")

  


const handleSubmit = async(e) =>{
e.preventDefault();
const formData = new FormData(e.target)
let locationName = formData.get('locationName')
let result = api.post('/create-location', {locationName, userId,role, userName})
result = await errorHandler(result)
setStatus(result.data.data._id)
alert(result.data.message)
}
  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="locationName">Location Name</label>
    <input
      type="text"
      className="form-control"
      required
      placeholder="Enter Location Name"
      id="locationName"
      name="locationName"
      value={formatTitle(locationName)}
      onChange={(e)=>setLocationName(e.target.value)}
    />
    </div>
    <button className='btn  btn-primary d-flex mx-auto btn-sm'  type='submit'>Add Location</button>
    </form>
  )
}
