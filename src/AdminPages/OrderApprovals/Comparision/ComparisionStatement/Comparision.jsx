import React, { useEffect, useState } from 'react'

import EditableTableForQuotationFinal from './ComparisionFinal'
import ComparisionByQuotationId from './ComparisionByQuotationId'
import { api } from '../../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../../CommonUtitlites/Others/errorHandle';
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";

export default function  Comparision (props) {
  const [data, setData] = useState([])
  const [projectName, setProjectName] = useState("")
  const [projectId, setProjectId] = useState("")
console.log(props)
  useEffect(() => {
    // Fetch data for selected project and set it in the 'data' state
    const handleResponse = async () => {
      let result = api.post("/get-quotations", {
        prId:props.prId,
        userId,
        role,
        userName,
      });
      result = await errorHandler(result);
      console.log(result.data)
      setData(result.data.data);
      setProjectId(result.data.projectId);
      setProjectName(result.data.projectName);
    };

    if (props.prId) {
      handleResponse();
    }
  }, [props.prId]);

const [toggle, setToggle] = useState(false)

const [vendor, setVendor] = useState("")

useEffect(() => {
  if(vendor && props.prId){
    props.setSelectedVendor(vendor)
    props.setPrId(props.prId)
    props.setToggle(toggle)

  }
}, [vendor])


  return (
    <div className='container-fluid'>



   
        
        <ComparisionByQuotationId data={data} vendorId={props.vendorId} projectId={projectId} projectName={projectName} toggle={(toggle)=>setToggle(toggle)} prId={props.prId} setVendorId={(vendorId)=>setVendor(vendorId)}/>

      </div>
  )
}
