import React, { useEffect, useState } from 'react'

import ComparisionByQuotationId from './ApprovedComparisionByQuotationId'
import { api } from '../../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../../CommonUtitlites/Others/errorHandle';
import {
  userId,
  role,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";

export default function  ApprovedComparision (props) {
  console.log(props)
  const [data, setData] = useState([])
  const [projectName, setProjectName] = useState("")
  const [projectId, setProjectId] = useState("")
  const [comparisionId, setComparisionId] = useState("")
  const [selectedVendors, setSelectedVendors] = useState("")
 const [remarks, setRemarks] = useState('')
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
      setComparisionId(props.comparisionId)
      setSelectedVendors(props.selectedVendors)
    
      let result2 = api.post("/get-comparision-by-id", {
        comparisionId:props.comparisionId,
        userId,
        role,
        userName,
      });
      result2 = await errorHandler(result2);

      setRemarks(result2.data.data.remarks)
      
    };

    if (props.prId) {
      handleResponse();
    }
  }, [props.prId]);

const [toggle, setToggle] = useState(false)

const [vendor, setVendor] = useState("")

useEffect(() => {
  console.log("HERe")
  if(vendor && props.prId){
    props.setSelectedVendor(vendor)
    props.setPrId(props.prId)
    props.setToggle(toggle)

  }
}, [vendor])


  return (
    <div className='container-fluid'>



   
        
        <ComparisionByQuotationId remarks={remarks} data={data} setVendorId={(id)=>setVendor(id)} comparisionId={comparisionId} projectId={projectId} projectName={projectName} toggle={(toggle)=>setToggle(toggle)} prId={props.prId} vendors={selectedVendors}/>

      </div>
  )
}
