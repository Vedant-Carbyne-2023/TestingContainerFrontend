import React, { useState } from 'react'
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'


export default function AddBlock({locationId, setStatus}) {

    const [blockName, setBlockName] = useState("")

const handleSubmit = async(e) =>{
e.preventDefault();
const formData = new FormData(e.target)
let blockName = formData.get('blockName')
let result = api.post('/create-block', {blockName, locationId, userId, role})
result = await errorHandler(result)
setStatus(result.data.data._id)
alert(result.data.message)
}


  return (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
    <label htmlFor="blockName">Block Name</label>
    <input
      type="text"
      className="form-control"
      placeholder="Enter Block Name"
      id="blockName"
      required
      name="blockName"
      value={formatTitle(blockName)}
      onChange={(e)=>setBlockName(e.target.value)}
    />
    </div>
    <button className='btn  btn-primary'  type='submit'>Submit</button>
    </form>
  )
}
