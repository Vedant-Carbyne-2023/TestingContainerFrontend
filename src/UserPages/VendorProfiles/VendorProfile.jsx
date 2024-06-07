import React, { useEffect, useState } from "react";
import useGetVendors from "../../CommonUtitlites/customHooks/useGetAllVendors";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import { role, userId } from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import VendorProfilePart from "./VendorProfilePart";
import MaterialIssueNote from "./Material Issue Note Of Vendor/MaterialIssueNote";
import StockReportVendor from "./VendorStockReport/StockReportVendor";
import AddVendorToBlackList from "./AddToBlackList";
import PurchaseOrders from "../../AdminPages/VendorProfiles/PurchaseOrders/PurchaseOrders";
import WorkOrders from "../../AdminPages/VendorProfiles/WorkOrders/WorkOrders";

export default function UserVendorProfile({permissison}) {
  const [filteredData, setFilteredData] = useState();

  const [deleted, setDeleted] = useState(false);
  const [loading, setLoading] = useState(true);

  let data = useGetVendors(deleted);

  // console.log(data)

  useEffect(() => {
    setLoading(true);
    setFilteredData(data);
    setLoading(false);
  }, [data, deleted]);

  const [searchInput, setSearchInput] = useState("");

console.log(filteredData)

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    let query = e.target.value;

    const filtered = data.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(query.toLowerCase())
      )
    );
    setFilteredData(filtered);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [entry, setEntry] = useState("");
  const handleModalOpen = async (item) => {
    setLoading(true);
    setIsModalOpen(true);
    setEntry(item);
    // console.log(item);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    // Ask for confirmation
    const confirmDelete = window.confirm("Are you sure you want to delete this vendor?");
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
    setLoading(true);
  
    let data = {};
    data.vendorId = id;
    data.userId = userId;
    data.role = role;
  
    let result = await api.post('/deleteVendor', data);
    result = await errorHandler(result);
    // console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    setDeleted(!deleted);
    setLoading(false);
  
    // console.log("delete");
  }

  const [activeComponent, setActiveComponent] = useState("profile");
  


  const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '100%',
  };
  const cellStyle = {
    border: '1px solid black',
  
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <>
      <div className="title">
        <span>Vendor's Profile </span>

        <div class="search-bar">
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            value={searchInput}
            onChange={handleChange}
          />
          <div class="search-icon-container">
            <div class="search-icon">
              <div class="icon">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>

        <button className="btn" onClick={()=>setIsModalOpen2(true)}>Add Vendor To BlackList</button>
      </div>
      { loading
      
      ?
      
      <Loader/>
      
      :
      
      
      <div className="row  m-0 p-3" style={{ overflow: "auto" }}>
        <table striped bordered hover responsive className="table" style={tableStyle}>
          <thead style={{ position: "sticky", top: "0" }}>
            <tr>
              <th style={cellStyle} >Name</th>
              <th style={cellStyle} > Category</th>
              <th style={cellStyle} >Project</th>
              <th style={cellStyle} >BlackListed</th>
              <th style={cellStyle} >Vendor Code</th>
              <th style={cellStyle} >Aadhaar Linked</th>
              {
                    role==='SuperUser'

                    &&
              <th style={cellStyle} >Delete</th>}
            </tr>
          </thead>
          <tbody style={{ height: "25rem", overflow: "auto" }}>
            {filteredData &&
              filteredData.map((item) => (
                <tr key={item._id}>
                  <td style={cellStyle} >
                    <button
                      className="btn"
                      onClick={() => handleModalOpen(item)}
                    >
                     {item.tradeName}
                    </button>
                  </td>
                  <td style={cellStyle} >{item.category.join(', ')}</td>
                  <td style={cellStyle} >{item.projectName}</td>
                  <td title={`Reason : ${item.isBlackListed.reason?item.isBlackListed.reason:"None"}`}  style={{ ...cellStyle,cursor:item.isBlackListed.isBlackListed?"pointer":'default',  width: '20rem', background:item.isBlackListed.isBlackListed?"Black":'none', color:item.isBlackListed.isBlackListed?"White":'Black' }} >{item.isBlackListed.isBlackListed?"True":"False"}
                  
                  </td>
                  <td style={cellStyle} >{item.vendor_code}</td>
                  <td style={{backgroundColor:item.aadhaarVerify?"green":'red'}} >{item.aadhaarVerify?"Yes":'No'}</td>

                  {
                    role==='SuperUser'

                    &&
                  <td style={cellStyle} ><button className="btn" onClick={()=>handleDelete(item._id)}>Delete</button></td>
                  }
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      }

<CustomModal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title={"Vendor Profile"}
>
  <div>
    <h6>{entry.vendorName}</h6>
    <h7>{entry.vendorEmail}</h7>
  </div>
  <div
    style={{
      display: "flex",
      justifyContent: "flex-start",
      marginTop: "20px"
    }}
  >
    <button
      className={`btn ${activeComponent === "profile" ? "active" : ""}`}
      style={{ margin: "0 10px" }}
      onClick={() => setActiveComponent("profile")}
    >
      Profile
    </button>
    <button
      className={`btn ${activeComponent === "note" ? "active" : ""}`}
      style={{ margin: "0 10px" }}
      onClick={() => setActiveComponent("note")}
    >
      Material Issue Note
    </button>
    <button
      className={`btn ${activeComponent === "stockReport" ? "active" : ""}`}
      style={{ margin: "0 10px" }}
      onClick={() => setActiveComponent("stockReport")}
    >
      Vendor Stock Report 
    </button>
    <button
      className={`btn ${activeComponent === "return" ? "active" : ""}`}
      style={{ margin: "0 10px" }}
      onClick={() => setActiveComponent("return")}
    >
      Return to Site
    </button>
    <button
            className={`btn   ${activeComponent === "wo" ? "active" : ""}`}
            style={{ margin: "0 10px" }}
            onClick={() => setActiveComponent("wo")}
          >
            Work Orders
          </button>
          <button
          style={{ margin: "0 10px" }}
            className={`btn  ${activeComponent === "po" ? "active" : ""}`}
            onClick={() => setActiveComponent("po")}
          >
            Purchase Orders
          </button>
  </div>
  {activeComponent && activeComponent === "profile" && (
    <VendorProfilePart entry={entry} change={(data)=>setDeleted(!deleted)} />
  )}
  {activeComponent && activeComponent === "note" && (
    <MaterialIssueNote vendorName={entry.vendorName} />
  )}
  {activeComponent && activeComponent === "stockReport" && (
    <StockReportVendor vendorName={entry.vendorName} />
  )}
  {activeComponent && activeComponent === "return" && (
    <p>Return To Site</p>
  )}
    {activeComponent && activeComponent === "wo" && (
          <WorkOrders vendorName={entry.vendorName} vendorId={entry.vendor_code} />
        )}
        {activeComponent && activeComponent === "po" && (
          <PurchaseOrders msName={entry.vendorName} msId={entry.vendor_code}  />
        )}
</CustomModal>

<CustomModal
  isOpen={isModalOpen2}
  onClose={() => setIsModalOpen2(false)}
  title={"Vendor To Blacklist"}
>
<AddVendorToBlackList setStatus={(data)=>setDeleted(!deleted)}/>

</CustomModal>

    </>
  );
}
