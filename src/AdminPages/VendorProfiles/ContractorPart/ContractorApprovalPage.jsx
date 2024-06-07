import React, { useEffect, useState } from "react";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { role, userId, userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import ContractorProfilePart from "./ContractorProfilePart";
import useGetAllContractors from "../../../CommonUtitlites/customHooks/useGetAllContractors";
import Loader from "../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import AddContractorToBlackList from "./AddToBlackList";
import WorkOrders from "../WorkOrders/WorkOrders";
import PurchaseOrders from "../PurchaseOrders/PurchaseOrders";
import styles from '../../TableModule/TableSticky.module.css';
import useGetAllContractorForApproval from "../../../CommonUtitlites/customHooks/useGetAllContractorForApproval";
import { format } from "date-fns";


export default function ContractorProfile() {
  const [filteredData, setFilteredData] = useState();

  const [deleted, setDeleted] = useState(false)
  const [loading, setLoading] = useState(true);
  let data = useGetAllContractorForApproval(deleted);

  console.log(data)

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
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [entry, setEntry] = useState("");
  const handleModalOpen = async (item) => {
    setLoading(true);
    setIsModalOpen(true);
    setEntry(item);
    console.log(item);
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
    data.userName = userName;

    let result = await api.post('/deleteContractor', data);
    result = await errorHandler(result);
    console.log(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    setDeleted(!deleted);
    setLoading(false);
    console.log("delete");
  }

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

    padding: '9px',
    textAlign: 'center',
  };

  const handleApproveContractor = async (contractorId) => {
    try {
      const response = await api.post('/contractor-approved', { contractorId, userId,userName });
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Contractor approved successfully.'
        });
        // Add any additional logic after successful approval, if needed
      } else {
        throw new Error(response.data.message || 'Failed to approve contractor.');
      }
    } catch (error) {
      console.error('Error approving Contractor:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to approve Contractor.'
      });
    }
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
        <button className="btn" onClick={() => setIsModalOpen2(true)}>Add Contractor To BlackList</button>
      </div>
      {
        loading ?
          <Loader />
          :
          <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
            <div className={`${styles.tableWrapper} col`}>
              <table className={`${styles.table} table`}>
                <thead className={`${styles.stickyHeader} sticky`}>
                  <tr>
                    <th >Name</th>
                    <th >Category</th>
                    <th >Project</th>
                    <th >BlackListed</th>
                    <th >Contractor Code</th>
                    {
                      role === 'SuperUser' &&
                      <th>Delete</th>
                    }
                    {
                      role === 'SuperUser' &&
                      <th>Created At</th>
                    }
                    {
                      role === 'SuperUser' &&
                      <th>Created By</th>
                    }
                    {
                      role === 'SuperUser' &&
                      <th>Approve Contractor</th>
                    }
                  </tr>
                </thead>
                <tbody>
                  {filteredData &&
                    filteredData.map((item) => (
                      <tr key={item._id}>
                        <td >
                          <button
                            className="btn"
                            onClick={() => handleModalOpen(item)}
                          >
                            {item.tradeName}
                          </button>
                        </td>
                        <td >{item.category.join(', ')}</td>
                        <td >{item.projectName}</td>
                        <td title={`Reason : ${item.isBlackListed.reason ? item.isBlackListed.reason : "None"}`} style={{ cursor: item.isBlackListed.isBlackListed ? "pointer" : 'default', width: '20rem', background: item.isBlackListed.isBlackListed ? "Black" : 'none', color: item.isBlackListed.isBlackListed ? "White" : 'Black' }}>{item.isBlackListed.isBlackListed ? "True" : "False"}
                        </td>
                        <td >{item.contractor_code}</td>
                        {
                          role === 'SuperUser' &&
                          <td ><button className="btn" onClick={() => handleDelete(item._id)}>Delete</button></td>
                        }
                        {
                          role === 'SuperUser' &&
                          <td >{item.createdAt ? format(new Date(item.createdAt), 'yyyy-MM-dd HH:mm:ss') : ""}</td>
                        }
                        {
                          role === 'SuperUser' &&
                          <td >{item.createdBy ? item.createdBy : ""}</td>
                        }
                        {
                          role === 'SuperUser' &&
                          <td>
                            <button className="btn" onClick={() => handleApproveContractor(item._id)}>
                              Approve Contractor
                            </button>
                          </td>
                        }
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
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
            flexWrap: "wrap",
            marginTop: "20px",
            lineHeight: "10px"
          }}
        >
          <button className="btn mb-2" onClick={() => openProfile()}>Profile</button>
          <button className="btn mb-2" onClick={() => openIssueNote()}>Material Issue Note</button>
          <button className="btn mb-2" onClick={() => openReturn()}>Return to Site</button>
          <button className="btn mb-2" onClick={() => setActiveComponent("wo")}>Work Order</button>
          <button className="btn mb-2" onClick={() => setActiveComponent("po")}>Purchase Order</button>
        </div>
        {activeComponent && activeComponent === "profile" && <ContractorProfilePart entry={entry} change={(data) => setDeleted(!deleted)} />}
        {/* place appropriate components insteat of paragraph tags */}
        {/* {activeComponent&& activeComponent === "note" && <p>Material Issue Note</p>} */}
        {activeComponent && activeComponent === "return" && <p>Return To Site</p>}
        {activeComponent && activeComponent === "wo" && <WorkOrders vendorId={entry._id} vendorName={entry.contractorName} />}
        {activeComponent && activeComponent === "po" && <PurchaseOrders msName={entry.contractorName} />}
      </CustomModal>
      <CustomModal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        title={"Vendor To Blacklist"}
      >
        <AddContractorToBlackList setStatus={(data) => setDeleted(!deleted)} />

      </CustomModal>
    </>
  );
}
