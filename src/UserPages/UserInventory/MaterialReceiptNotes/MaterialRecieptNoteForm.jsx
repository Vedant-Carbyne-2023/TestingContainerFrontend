import React, { useEffect, useState } from "react";
import MaterialReceiptNoteEditableTable from "./MaterialReceiptNoteEditableTable";
import { currentDate } from "../../../CommonUtitlites/Others/commonExportVariable";
import {userId, role} from '../../../CommonUtitlites/Others/commonExportVariable'
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../CommonUtitlites/Loader/Loader";
export default function MaterialRecieptNoteForm({ data, projectId }) {
  // console.log(data);

  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getTable = async()=>{
      setLoading(true);
      let result = api.post('/get-mrnTable-by-mrnId', {userId,role,mrnId:data.mrnsId})
      result = await errorHandler(result)
      setTableData(result.data.data)
      // console.log(result)
      setLoading(false);
    }
getTable()
  }, [data])
  

 

  
  return (
    <div>
      { loading?<Loader/>:<div className="container form-grid">
        <div className="row">
          <div className="col-md-12">
            <img
              src="../carbyne.jpg"
              style={{ float: "left" }}
              alt="Carbyne Logo"
            />
            <h3 className="text-center">
              CARBYNE INFRASTRUCTURE PRIVATE LIMITED
            </h3>
            <p className="text-center mb-0">
              B-11, Third Floor B Block Noida, Gautam Buddha Nagar
            </p>
            <p className="text-center mb-0">Uttar Pradesh, India Pin 201301</p>
            <p className="text-center mb-0">CIN No.-U74110UP1993PTC015005</p>
            <h4 className="text-center mt-3">Material Reciept Note</h4>
          </div>
        </div>
        <hr />
        <form >
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="poId">Purchase Order Id</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter MR Number"
                  name="poId"
                  value={data.poId}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vendorName"> Vendor Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Vendor Name"
                  name="vendorName"
                  id="vendorName"
                  value={data.vendorName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="vehicleNumber">Vehicle Number</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Vehicle Number"
                  name="vehicleNumber"
                  readOnly
                  value={data.vehicleNumber}
                />
                </div>
              {/* <div className="form-group">
          <label htmlFor="contractorName">MR Requester Name</label>

            <input
              className="form-control"
              type="text"
              placeholder="Enter Work Order No."
              name="workOrder"
            />
          </div> */}
              {/* <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Location/Village"
                  name="location"
                  value={data.gp}
                />
              </div>
              <div className="form-group">
                <label htmlFor="block">Store</label>

                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Block"
                  name="block"
                  value="Store 1"
                />
              </div> */}
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Project Name"
                  name="projectName"
                  value={data.projectName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="minDate">Material Recieved Date</label>

                <input
  className="form-control"
  type="date"
  placeholder="Date"
  name="mrnDate"
  value={data.mrnDate ? new Date(data.mrnDate).toISOString().split('T')[0] : ''}
  required
/>
              </div>
              <div className="form-group">
                <label htmlFor="transporterName">Transporter Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Transporter Name"
                  name="transporterName"
                  value={data.transporterName}
                />
              </div>
            </div>
           
          
              
       
          </div>

          <div className="row">
            <div className="col-md-12">
            
              <MaterialReceiptNoteEditableTable  tableData={tableData} />
              

              
              <div className="row" style={{ height: "150px" }}>
                <span style={{ marginLeft: "auto", display: "flex" }}>
                  Authorised Signature With Seal
                </span>
              </div>
              <div
                className="row"
                style={{
                  height: "100px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>Request By</span>
                <span>Approved By</span>
                <span>Store Keeper</span>
                <span>Received By</span>
              </div>
              <div className="row d-flex">
                {/* <button
                  className="btn btn-primary"
                  style={{
                    borderRadius: "3rem",
                    display: "flex",
                    margin: "auto",
                  }}
                  type="submit"
                >
                  Submit
                </button> */}
                {/* <button
                  className="btn btn-primary"
                  style={{
                    borderRadius: "3rem",
                    display: "flex",
                    margin: "auto",
                  }}
                  type="button"
                  onClick={() => window.print()}
                >
                  Print
                </button> */}
              </div>
            </div>
          </div>
        </form>
      </div>
      }
    </div>
  );
}
