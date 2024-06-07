import React, { useState, useEffect } from 'react'
import getData from './getMTO';
import EditableTable from "./EditableTable/EditableTable";
import { role, userId } from '../../../CommonUtitlites/Others/commonExportVariable';
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import Swal from 'sweetalert2';
import SearchInputPostgres from '../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue';
import useGetUserProject from '../../../CommonUtitlites/customHooks/useGetUserProject';
import useGetVendorsProjectWise from '../../../CommonUtitlites/customHooks/useGetProjectWiseVendors';
import SearchInput from '../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput';
import SearchInputVendor from '../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor';

export default function MaterialTransferOrderForm({data1}) {
    const currentDate = new Date().toISOString().split("T")[0];

    const [tableData, setTableData] = useState([]);
    const [mtoDate, setMtoDate] = useState(currentDate);
    const [mtoNumber, setMtoNumber] = useState('');
    const [transferFromGp, setTransferFromGp] = useState('');
    const [transferToGp, setTransferToGp] = useState('');
    const [mrnDate, setMrnDate] = useState('');
    const [mtoContractorName, setMtoContractorName] = useState('');
    const [remark, setRemark] = useState('');
  const [projectSelected, setProjectSelected] = useState({name:"",id:"",projectCode:""})
  const [selectedVendor, setSelectedVendor] = useState({ id: "", name: "" });
  const [gps, setGps] = useState([])
  let projects = useGetUserProject();


    let vendors = useGetVendorsProjectWise(projectSelected.id);
  const handleProject = async (data) => {
    const selectedProjectId = data.id;

    let project = projects.find((project) => project.id === selectedProjectId);

    setProjectSelected({ name: project.name, id: project.id, projectCode:project.projectCode });

    // let response = api.post("/get-all-gps", {
    //   locationName: project.name,
    //   userId,
    //   role,
    // });
    // response = await errorHandler(response);
    // console.log(response);
    setGps(project.gpName);
  };


    const handleSubmit = async(e)=>{
        e.preventDefault();
        // Gather all form data
         const formData = {
           mtoDate,
           transferFromGp,
           transferToGp,
           selectedVendor,
           remark,
           tableData,
           projectSelected,
         };

         try {
          // console.log('form data: ',formData);
          let result = await api.post(
            "/create-mtoEntry",
            formData
          );
          result = await errorHandler(result);
          console.log('we recieved result',result);
          if(result&&result.data){
            Swal.fire(result.data.message);
              // alert(result.data.message);
          }
        } catch (error) {
          if (error && error.response && error.response.data) {
            Swal.fire(error.response.data.message);
            // alert(error.response.data.message);
          }
        }
    }


   
    const data = [{

      no:"CIPIL/MTO/30934",
      date:"12/07/2023",
      desc:"material 1",
      vendor:"Name Of vendor",
    },{  no:"CIPIL/MTO/30934",
    date:"12/07/2023",
    desc:"material 1",
    vendor:"Name Of vendor",}]
  return (
    <div className="container">
        <form onSubmit={handleSubmit}>
          {/* <div className="m-3 p-2">
            <h6>MRN Number</h6>
            <input name="mtoNumber" type='text' id="mtoNumber" />
          </div> */}
          <div className="form-grid">
          <div className="row mb-0">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="mtoDate">MTO Date: </label>
                <input 
                className="form-control" 
                name="mtoDate"  
                id="mtoDate" 
                value={currentDate} 
                />
              </div>
            

              <SearchInput
            placeholder={"Select Transfer To GP"}
            items={gps}
            title={"Select Gp"}
            id={"gpdetails"}
            ResultOnClick={(data) => setTransferToGp(data)}
          />

<SearchInput
            placeholder={"Select Transfer From GP"}
            items={gps}
            title={"Select Gp"}
            id={"gpdetails"}
            ResultOnClick={(data) => setTransferFromGp(data)}
          />
            
              {/* <div className="form-group">
                <label htmlFor="mtoQuantity">Item Quantity: </label>
                <input type="number" className="form-control" name="mtoQuantity" id="mtoQuantity"/>
              </div>
              <div className="form-group">
                <label htmlFor="mtoAmount">Item Amount: </label>
                <input type="number" className="form-control" name="mtoAmount" id="mtoAmount"/>
              </div> */}
            </div>
            <div className="col-md-6">
              {/* <div className="form-group">
                <label htmlFor="mrnDate">MRN Date: </label>
                <input 
                type="date" 
                className="form-control" 
                name="mrnDate" 
                id="mrnDate"
                value={mrnDate}
                onChange={(e) => setMrnDate(e.target.value)}
                />
              </div> */}
                <SearchInputPostgres
            placeholder={"Select Project"}
            items={projects}
            title={"Project"}
            id={"projectDetails"}
            ResultOnClick={(data) => handleProject(data)}
          />

    <SearchInputVendor
            placeholder={"Select Vendor"}
            items={vendors}
            title={"Vendor"}
            id={"vendorDetails"}
            ResultOnClick={(data) => setSelectedVendor(data)}
          />
             
            

              <div className="form-group">
                <label htmlFor="remark">MTO Remark: </label>
                <input 
                type="text" 
                className="form-control" 
                name="remark" 
                id="remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)} 
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="mtoDescription">Item Name: </label>
                <input type="text" className="form-control" name="mtoDescription" id="mtoDescription" readOnly value={data.itemName}/>
              </div>
              <div className="form-group">
                <label htmlFor="mtoUom">Item UOM: </label>
                <input className="form-control" name="mtoUom" id="mtoUom" readOnly value={"MM"}/>
              </div>
              <div className="form-group">
                <label htmlFor="mtoRate">Item Rate: </label>
                <input type="number" className="form-control" name="mtoRate" id="mtoRate"/>
              </div> */}
            </div>
          </div>
          <EditableTable tableData={(data) => setTableData(data)} />
          </div>

          {/* @@@@@@@@@@@@@!!!!!!!!!!############### */}
          {/* <div className="m-3 p-2">
            <h6>MTO Date</h6>
            <input name="mtoDate"  id="mtoDate" value={currentDate} />
          </div>
          <div className="m-3 p-2">
            <h6>MRN Number</h6>
            <input name="mtoNumber" readOnly id="mtoNumber" value={data.indentId}/>
          </div>
          <div className="m-3 p-2">
            <h6>MRN Date</h6>
            <input name="mrnDate" readOnly id="mrnDate" value={data.indentDate}/>
          </div>
          <div className="m-3 p-2">
            <h6>MRN Contractor Name</h6>
            <input name="mtoContractorName" readOnly id="mtoContractorName" value={data.vendor}/>
          </div>
          <div className="m-3 p-2">
            <h6>GP Name</h6>
            <input name="mtoGpName" id="mtoGpName" readOnly value={data.gp}/>
          </div>
         
          <div className="m-3 p-2">
            <h6>Item Name</h6>
            <input name="mtoDescription" id="mtoDescription" readOnly value={data.itemName}/>
          </div>
          <div className="m-3 p-2">
            <h6>Item UOM</h6>
            <input name="mtoUom" id="mtoUom" readOnly value={"MM"}/>
          </div>
          <div className="m-3 p-2">
            <h6>Item Quantity</h6>
            <input name="mtoQuantity" id="mtoQuantity" value={"23"}/>
          </div>
          <div className="m-3 p-2">
            <h6>Item Rate</h6>
            <input name="mtoRate" id="mtoRate" value={"1"}/>
          </div>
          <div className="m-3 p-2">
            <h6>Item Amount</h6>
            <input name="mtoAmount" id="mtoAmount" value={"23"}/>
          </div>
          <div className="m-3 p-2">
            <h6>MTO Remark</h6>
            <input name="remark" id="remark" />
          </div> */}
          <div>
          <button type='submit' className='btn'>Submit</button>
          </div>
            </form> 

    </div>
  )
}
