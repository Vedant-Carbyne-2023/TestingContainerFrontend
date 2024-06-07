import React, { useEffect, useState } from "react";
import AdminNavbar from "../../../CommonUtitlites/AdminNavbar/AdminNavbarC";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { role, userId } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import ContractorProfilePart from "./ContractorProfilePart";
import useGetAllContractors from "../../../CommonUtitlites/customHooks/useGetAllContractors";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import AddContractorToBlackList from "./AddToBlackList";
import MaterialIssueNote from "../Material Issue Note Of Vendor/MaterialIssueNote";
import StockReportVendor from "../VendorStockReport/StockReportVendor";
import WorkOrders from "../../../AdminPages/VendorProfiles/WorkOrders/WorkOrders";
import PurchaseOrders from "../../../AdminPages/VendorProfiles/PurchaseOrders/PurchaseOrders";

export default function UserContractorProfile() {
  const [filteredData, setFilteredData] = useState();

  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(true);
  let data = useGetAllContractors(deleted);

  // console.log(data)

  useEffect(() => {
    setLoading(true);
    setFilteredData(data);
    setLoading(false);
  }, [data, deleted]);

  const [searchInput, setSearchInput] = useState("");

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
    const confirmDelete = window.confirm("Are you sure you want to delete this contractor?");
    if (!confirmDelete) {
      // If the user cancels the deletion, do nothing
      return;
    }
    setLoading(true);
    let data = {};
    data.contractorId = id;
    data.userId = userId;
    data.role = role;
  
    let result = await api.post('/deleteContractor', data);
    result = await errorHandler(result);
    // console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    setDeleted(!deleted);
    setLoading(false);
    // console.log("delete");
  }
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null);
  
  const openProfile = async () => {
    setActiveComponent("profile");
  }

  const openIssueNote = async () => {
    setActiveComponent("note");
  }

  const openReturn = async () => {
    setActiveComponent("return");
  }

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
        <span>Contractor's Profile </span>

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
        <button className="btn" onClick={()=>setIsModalOpen2(true)}>Add Contractor To BlackList</button>
      </div>
      { loading?<Loader/>:<div className="row  m-0 p-3" style={{ overflowX: "auto" }}>
        <table striped bordered hover responsive className="table" style={tableStyle}>
          <thead style={{ position: "sticky", top: "0" }}>
            <tr>
              <th style={cellStyle} >Name</th>
              <th style={cellStyle} > Category</th>
              <th style={cellStyle} >Project</th>
              <th style={cellStyle} >BlackListed</th>
              <th style={cellStyle} >Contractor Code</th>
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
                  <td style={cellStyle} >{item.contractor_code}</td>
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
        title={"Contractor Profile"}
      >
        <h6>{entry.contractorName}</h6>
        <h7>{entry.contractorEmail}</h7>
        {/* <div>
          <button onClick={() => openProfile()}>Profile</button>
          <button>Material Issue Note</button>
          <button>Return to Site</button>
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap:"wrap",
            marginTop: "20px",
            lineHeight:"10px"
          }}
        >
           <button className="btn mb-2" onClick={() => openProfile()}>Profile</button>
           <button className="btn mb-2"  onClick={() => openIssueNote()}>Material Issue Note</button>
           <button className="btn mb-2" onClick={() => openReturn()}>Return to Site</button>
           <button className="btn mb-2" onClick={() => setActiveComponent("stockReport")}>Stock Report</button>
           <button className="btn mb-2"  onClick={() =>  setActiveComponent("wo")}>Work Order</button>
           <button className="btn mb-2" onClick={() =>  setActiveComponent("po")}>Purchase Order</button>
        </div>
        {activeComponent&& activeComponent === "profile" && <ContractorProfilePart entry={entry} change={(data)=>setDeleted(!deleted)}/>}
        {/* place appropriate components insteat of paragraph tags */}
        {activeComponent&& activeComponent === "note" &&           <MaterialIssueNote vendorName={entry.contractorName} />
}
        {activeComponent&& activeComponent === "return" && <p>Return To Site</p>}
        {activeComponent && activeComponent === "stockReport" && (
          <StockReportVendor vendorName={entry.contractorName} />
        )}
        {activeComponent&& activeComponent === "wo" && <WorkOrders vendorId={entry._id} vendorName={entry.contractorName} />}
        {activeComponent&& activeComponent === "po" && <PurchaseOrders msName={entry.contractorName} />}
      </CustomModal>

      <CustomModal
  isOpen={isModalOpen2}
  onClose={() => setIsModalOpen2(false)}
  title={"Vendor To Blacklist"}
>
<AddContractorToBlackList setStatus={(data)=>setDeleted(!deleted)}/>

</CustomModal>
    </>
  );
}
