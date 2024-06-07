import React, { useEffect, useState } from 'react'

import GrnTable from './GrnTable';
import { currentDate, role, userId } from '../../CommonUtitlites/Others/commonExportVariable';
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import CustomModalPDF from '../../CommonUtitlites/ModalPopUpWithPDF/CustomModal';
import useGetUserProject from '../../CommonUtitlites/customHooks/useGetUserProject';
import SearchInputPostgres from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputForPostgresIdIssue';
import SearchInput from '../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput';
import styles from './Grn.module.css'
import Swal from 'sweetalert2';
import useGetDateSchema from '../../CommonUtitlites/customHooks/useGetDateSchema';
export default function Grn() {


  let {backDate,futureDate,todayDate} = useGetDateSchema();

let projects = useGetUserProject();
const [projectSelected, setProjectSelected] = useState({ id: "", name: "" });
const [gpSelected, setGpSelected] = useState("");
const [blockSelected, setBlockSelected] = useState("");

const [gps, setGps] = useState([]);
const [minNumber, setMinNumber] = useState('')



  const [isModalOpen, setModalOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("show");
  const [formValues, setFormValues] = useState({
    contractorName: '',
    block: '',
    gp: '',
    project: '',
    date: '',
    minNumber: '',
    items: [
      { id: 1, itemDescription: 'metallic wire', uom: 'kg', qtyIssued: '23', remark: 'check properly' },
      { id: 2, itemDescription: '', uom: '', qtyIssued: '', remark: '' },
      { id: 3, itemDescription: '', uom: '', qtyIssued: '', remark: '' },
      { id: 4, itemDescription: '', uom: '',  qtyIssued: '', remark: '' },
      { id: 5, itemDescription: '', uom: '',  qtyIssued: '', remark: '' }
    ]
  });




  const handleAddRow = () => {
    const newRow = {
      id: formValues.items.length + 1,
      itemDescription: '',
      uom: '',
      qtyIssued: '',
      remark: ''
    };

    setFormValues((prevState) => ({
      ...prevState,
      items: [...prevState.items, newRow]
    }));
  };

  const handleProject = async (data) => {
    const selectedProjectId = data.id;

    let project = projects.find((project) => project.id === selectedProjectId);

    setProjectSelected({ name: project.name, id: project.id });

    let response = api.post("/get-all-gps", {
      locationName: project.name,
      userId,
      role,
    });
    response = await errorHandler(response);
    // console.log(response);
    setGps(response.data.data);
  };


  const handleChange = (e, id) => {
    const { name, value } = e.target;
    const updatedItems = formValues.items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });
    setFormValues((prevState) => ({
      ...prevState,
      items: updatedItems
    }));
  };

  const handleGpChange = async (data) => {
    setGpSelected(data);
    // console.log(data);

    let response = api.post("/get-block-from-gp", {
      gpId: data.id,
      userId,
      role,
    });
    response = await errorHandler(response);
    // console.log(response.data.data);
    setBlockSelected(response.data.data);
  };


  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if(name === 'minNumber'){
      setMinNumber(value)
    }
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

const [minData, setMinData] = useState([])
const [minTableData, setMinTableData] = useState([])
  const handleSearch = async() => {
    if(minNumber)
    {
      let result = api.post('/get-single-min', {userId,role,minId:minNumber})
      result = await errorHandler(result)
      if(!result.data.data[0]){
        Swal.fire({
          title:"You Have Entered Wrong MIN"
        })
        return;
      }
      setMinData(result.data.data[0])
      setMinTableData(result.data.tableData)
    }
  };

useEffect(() => {
  setFormValues({
    contractorName:minData.vendor,
    block:minData.block,
    gp:minData.gp,
    project:minData.project,
    items:minTableData,
    minNumber:minNumber

  })
}, [minData,minTableData])

  const handleFormSubmit = async(event) => {
    event.preventDefault();
    // Add your logic here to handle form submission and password change
    try {
      // console.log('form data: ',formValues);
      let result = await api.post(
        "/create-grnEntry",
        formValues
      );
      result = await errorHandler(result);
      // console.log(result);
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
  };
  return (
   <>
    {/* <div className="title">
      <span>GRN </span>
      <div>
 

      </div>
      <div class="search-bar">
        <input type="text" class="form-control" placeholder="Search" />
        <div class="search-icon-container">
          <div class="search-icon">
            <div class="icon">
              <i class="fas fa-search"></i>
            </div>
          </div>
        </div>
      </div>

    </div> */}
    <>
    <div
          className="row p-0 m-0 mt-2 mb-2 d-flex"
          style={{ justifyContent: "space-around" }}
        >
      
            <button
              className={`btn ${
                activeComponent === "create" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("create")}
              >
             Add GRN
            </button>
          
            <button
              className={`btn ${
                activeComponent === "show" ? "active" : ""
              }`}
              onClick={() => setActiveComponent("show")}
              >
             Show GRN
            </button>
            
    </div>
   
         {( activeComponent && activeComponent === "create" &&
            (
              <div className='form-grid mb-2'>
              <div className="container ">
            <div className="row">
              <div className="col-md-12">
                <img src="/carbyne.jpg" style={{width:"120px",height:"120px"}} alt="Carbyne Logo" />
                <h3 className="text-center">CARBYNE INFRASTRUCTURE PRIVATE LIMITED</h3>
                <p className="text-center mb-0">B-11, Third Floor B Block Noida, Gautam Buddha Nagar</p>
                <p className="text-center mb-0">Uttar Pradesh, India Pin 201301</p>
                <p className="text-center mb-0">CIN No.-U74110UP1993PTC015005</p>
                <h4 className="text-center mt-3">Gate Pass Behalf Of Material Issue Note</h4>
              </div>
            </div>
            <hr />
            <form onSubmit={handleFormSubmit} >
              <div className="row mb-4">
                <div className="col-md-6 ">
                <div className="form-group">
                {minData &&
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Project Name"
                      name="project"
                      id="project"
                      readOnly  
                      value={minData.project}
                      onChange={handleChange2}
                    />
                  }
                  </div>
                <div className="form-group">
                {minData &&
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Block Name"
                      name="block"
                      id="block"
                      readOnly  
                      value={minData.block}
                      onChange={handleChange2}
                    />
                  }
                  </div>
                <div className="form-group">
                {minData &&
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Gp Name"
                      name="gp"
                      id="gp"
                      readOnly  
                      value={minData.gp}
                      onChange={handleChange2}
                    />
                  }
                  </div>
                  
                  {/* <div className="form-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Work Order No."
                      name="workOrder"
                      value={formValues.workOrder}
                      onChange={handleChange2}
                    />
                  </div> */}
                      
                  
                </div>
                <div className="col-md-6">
                <div className="form-group">
      <div className={styles.searchContainer}>
        <input
          className="form-control"
          type="text"
          placeholder="Enter MIN Number"
          name="minNumber"
          value={minNumber}
          onChange={handleChange2}
        />
        <i className={`${styles.searchIcon} fas fa-search`} onClick={handleSearch}></i>
      </div>
    </div>


                <div className="form-group">
                   {minData &&
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Contractor Name"
                        name="contractorName"
                        id="contractorName"
                      readOnly  
                      value={minData.vendor}
                      onChange={handleChange2}
                    />
                  }
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="date"
                      readOnly={todayDate && (!futureDate && !backDate)}
                      placeholder="Date"
                      name="date"
                      defaultValue={currentDate}
                      max={backDate?currentDate:""}
                      min={futureDate?currentDate:''}
                      onChange={handleChange2}
                    />
                  </div>
                
                  
                </div>
              </div>
      
              <div className="row">
                <div className="col-md-12">
                  <table className="table table-bordered" style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                    <thead>
                      <tr>
                        <th scope="col">Sr. No.</th>
                        <th scope="col">Description of Items</th>
                        <th scope="col">UOM</th>
                        <th scope="col">Qty. Issued</th>
                        <th scope="col">Remark</th>
                      </tr>
                    </thead>
                    <tbody id="itemRows">
                      {minTableData.map((item,index) => (
                        <tr key={item.id}>
                          <td>{index+1}</td>
                          <td style={{width:'fit-content'}}>
                            <input
                              type="text"
                              style={{width:'25rem'}}
                              className="form-control"
                              name="itemDescription"
                              value={item.materialCategory +'/'+item.materialSubCategory+'/'+item.materialDescription}
                              onChange={(e) => handleChange(e, item.id)}
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="uom"
                              value={item.uom}
                              onChange={(e) => handleChange(e, item.id)}
                            />
                          </td>
                          
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              name="qtyIssued"
                              value={item.qtyIssued}
                              onChange={(e) => handleChange(e, item.id)}
                            />
                          </td>
                          <td>
                            <textarea
                              type="text"
                              className="form-control"
                              name="remark"
                              value={item.remark}
                              onChange={(e) => handleChange(e, item.id)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                  type='button'
                      className="btn btn-primary"
                      style={{ borderRadius: '3rem', display: 'flex', margin: 'auto' }}
                      onClick={handleAddRow}
                    >
                      Add Row
                    </button>
                  <div className="row" style={{ height: '150px' }}>
                    <span style={{ marginLeft: 'auto', display: 'flex' }}>Authorised Signature With Seal</span>
                  </div>
                  <div className="row" style={{ height: '100px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Request By</span>
                    <span>Approved By</span>
                    <span>Store Keeper</span>
                    <span>Received By</span>
                  </div>
                  <div className="row d-flex">
                    <button className="btn btn-primary" style={{ borderRadius: '3rem', display: 'flex', margin: 'auto' }} type="submit">
                      Submit
                    </button>
                    <button className="btn btn-primary" style={{ borderRadius: '3rem', display: 'flex', margin: 'auto' }} type='button' onClick={() => window.print()}>
                      Print
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          </div>
            )
          )
    }
    {
        ( activeComponent && activeComponent === "show" &&
            <GrnTable />
          )
    }
    </>
   
    </>
  )
}
