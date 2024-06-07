import React, { useEffect, useState } from 'react'

import ComparisionByQuotationId from './ApprovedComparisionByQuotationId'
import { api } from '../../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../../CommonUtitlites/Others/errorHandle';
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";

export default function  ApprovedComparision (props) {
  console.log(props)
  const [data, setData] = useState([])
  const [projectName, setProjectName] = useState("")
  const [projectId, setProjectId] = useState("")
  const [comparisionId, setComparisionId] = useState("")
  const [selectedVendors, setSelectedVendors] = useState("")

  useEffect(() => {
    // Fetch data for selected project and set it in the 'data' state
    const handleResponse = async () => {
      let result = api.post("/get-quotations", {
        prId:props.prId,
        userId,
        role,
      });
      result = await errorHandler(result);
      console.log(result.data)
      setData(result.data.data);
      setProjectId(result.data.projectId);
      setProjectName(result.data.projectName);
      setComparisionId(props.comparisionId)
      setSelectedVendors(props.selectedVendors)
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



   
        
        <ComparisionByQuotationId purchase_permission={props.purchase_permission} data={data} setVendorId={(id)=>setVendor(id)} comparisionId={comparisionId} projectId={projectId} projectName={projectName} toggle={(toggle)=>setToggle(toggle)} prId={props.prId} vendors={selectedVendors}/>

      </div>
  )
}
