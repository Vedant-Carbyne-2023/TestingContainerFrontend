import React, { useEffect, useState } from "react";
import useGetVendors from "../../CommonUtitlites/customHooks/useGetAllVendors";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';
import { role, userId, userName } from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import VendorProfilePart from "./VendorProfilePart";
import MaterialIssueNote from "./Material Issue Note Of Vendor/MaterialIssueNote";
import StockReportVendor from "./VendorStockReport/StockReportVendor";
import AddVendorToBlackList from "./AddToBlackList";
import WorkOrders from "./WorkOrders/WorkOrders";
import PurchaseOrders from "./PurchaseOrders/PurchaseOrders";
import styles from '../TableModule/TableSticky.module.css';
import useGetVendorsForApproval from "../../CommonUtitlites/customHooks/useGetAllVendorsForApproval";
import { format } from "date-fns";

export default function VendorApprovalPage() {
    const [filteredData, setFilteredData] = useState();

    const [deleted, setDeleted] = useState(false);
    const [loading, setLoading] = useState(true);

    let data = useGetVendorsForApproval(deleted);

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
        data.userName = userName;

        let result = await api.post('/deleteVendor', data);
        result = await errorHandler(result);
        console.log(result);
        Swal.fire(result.data.message);
        // alert(result.data.message);
        setDeleted(!deleted);
        setLoading(false);

        console.log("delete");
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

    const handleApproveVendor = async (vendorId) => {
        try {
          const response = await api.post('/vendor-approved', { vendorId, userId,userName });
          if (response.data.success) {
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Vendor approved successfully.'
            });
            // Add any additional logic after successful approval, if needed
          } else {
            throw new Error(response.data.message || 'Failed to approve vendor.');
          }
        } catch (error) {
          console.error('Error approving vendor:', error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message || 'Failed to approve vendor.'
          });
        }
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
                                        <th >Vendor Code</th>
                                        {
                                            role === 'SuperUser' &&
                                            <th >Delete</th>
                                        }
                                        {
                                            role === 'SuperUser' &&
                                            <th >Created At</th>
                                        }
                                        {
                                            role === 'SuperUser' &&
                                            <th >Created By</th>
                                        }
                                        {
                                            role === 'SuperUser' &&
                                            <th >Approve</th>
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData &&
                                        filteredData.map((item) => (
                                            <tr key={item._id}>
                                                <td style={cellStyle}>
                                                    <button
                                                        className="btn"
                                                        onClick={() => handleModalOpen(item)}
                                                    >
                                                        {item.tradeName}
                                                    </button>
                                                </td>
                                                <td >{item.category.join(', ')}</td>
                                                <td >{item.projectName}</td>
                                                <td title={`Reason : ${item.isBlackListed.reason ? item.isBlackListed.reason : "None"}`} style={{ ...cellStyle, cursor: item.isBlackListed.isBlackListed ? "pointer" : 'default', width: '20rem', background: item.isBlackListed.isBlackListed ? "Black" : 'none', color: item.isBlackListed.isBlackListed ? "White" : 'Black' }}>{item.isBlackListed.isBlackListed ? "True" : "False"}
                                                </td>
                                                <td >{item.vendor_code}</td>
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
                                                        <button className="btn" onClick={() => handleApproveVendor(item._id)}>
                                                            Approve Vendor
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
                title={"Vendor Profile"}
                size={"xl"}
            >
                <div>
                    <h6>{entry.vendorName}</h6>
                    <h7>{entry.vendorEmail}</h7>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        flexWrap: "wrap",
                        marginTop: "20px",
                        lineHeight: "10px"
                    }}
                >
                    <button
                        className={`btn mb-2  ${activeComponent === "profile" ? "active" : ""}`}
                        onClick={() => setActiveComponent("profile")}
                    >
                        Profile
                    </button>
                    {/* <button
      className={`btn ${activeComponent === "note" ? "active" : ""}`}
      style={{ margin: "0 10px" }}
      onClick={() => setActiveComponent("note")}
    >
      Material Issue Note
    </button> */}
                    <button
                        className={`btn mb-2  ${activeComponent === "stockReport" ? "active" : ""}`}
                        onClick={() => setActiveComponent("stockReport")}
                    >
                        Vendor Stock Report
                    </button>
                    <button
                        className={`btn mb-2  ${activeComponent === "return" ? "active" : ""}`}
                        onClick={() => setActiveComponent("return")}
                    >
                        Return to Site
                    </button>
                    <button
                        className={`btn  mb-2  ${activeComponent === "wo" ? "active" : ""}`}
                        onClick={() => setActiveComponent("wo")}
                    >
                        Work Orders
                    </button>
                    <button
                        className={`btn mb-2  ${activeComponent === "po" ? "active" : ""}`}
                        onClick={() => setActiveComponent("po")}
                    >
                        Purchase Orders
                    </button>
                </div>
                {activeComponent && activeComponent === "profile" && (
                    <VendorProfilePart entry={entry} change={(data) => setDeleted(!deleted)} />
                )}
                {activeComponent && activeComponent === "note" && (
                    <MaterialIssueNote vendorName={entry.vendorName} />
                )}
                {activeComponent && activeComponent === "stockReport" && (
                    <StockReportVendor vendorName={entry.vendorName} />
                )}
                {activeComponent && activeComponent === "wo" && (
                    <WorkOrders vendorName={entry.vendorName} vendorId={entry._id} />
                )}
                {activeComponent && activeComponent === "po" && (
                    <PurchaseOrders msName={entry.vendorName} />
                )}
                {activeComponent && activeComponent === "return" && (
                    <p>Return To Site</p>
                )}
            </CustomModal>
            <CustomModal
                isOpen={isModalOpen2}
                onClose={() => setIsModalOpen2(false)}
                title={"Vendor To Blacklist"}
            >
                <AddVendorToBlackList setStatus={(data) => setDeleted(!deleted)} />

            </CustomModal>


        </>
    );
}
