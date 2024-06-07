import React, { useEffect, useState } from "react";
import styles from './Logs.module.css';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { authenticateUser } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import {
    userId,
    role,
    userName,
} from "../../CommonUtitlites/Others/commonExportVariable";
import {
    MDBContainer,
    MDBCol,
} from 'mdb-react-ui-kit';

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 50;
    const [search, setSearch] = useState("")

    useEffect(() => {
        const authenticateAndFetch = async () => {
            // const token = localStorage.getItem('token');
            // await authenticateUser(token);
            // console.log("herok")
            setLoading(true);
            try {
                const allLogs = await api.post(`/get-all-logs?page=${currentPage}`, { userId, role, userName, search });
                const processedLogs = await errorHandler(allLogs);
                console.log(processedLogs)
                if (processedLogs && processedLogs.data) {
                    setLogs(processedLogs.data.data);
                }
            } catch (error) {
                console.error("Error fetching logs:", error);
            }
            setLoading(false);
        };

        authenticateAndFetch();
    }, [currentPage, search]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };

    // Function to handle increasing the current page
    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        handlePageChange(nextPage);
    };

    // Function to handle decreasing the current page
    const handlePreviousPage = () => {
        const previousPage = currentPage - 1;
        handlePageChange(previousPage);
    };



    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    // const currentLogs = logs.slice(indexOfFirstLog, indexOfLastLog);
    const lastPage = logs.length < 50;
    return (
        <>
            <div className="title">
                <span>All Logs</span>
                {/* Search bar */}
            </div>

            <div style={{ display: "flex", justifyContent: 'space-around' }}>

                <div>
                    Logs

                </div>
                <div>
                    <label
                        htmlFor="Search By Following">
                        Search
                    </label>
                    <select
                        id="Search By Following"
                        className="form-control"
                        style={{ width: "15rem" }}
                        onChange={(e) => setSearch(e.target.value)}
                    >
                        <option value="Project">Project</option>
                        <option value="WorkOrder">WorkOrder</option>
                        <option value="Gps">Gps</option>
                        <option value="Role">Role</option>
                        <option value="Logged">Login</option>
                        {/* <option value="Logout">Logout</option> */}
                        <option value="Error">Error</option>
                        <option value="Boq">Boq</option>
                        <option value="Vendor Code">Vendor Code</option>
                        <option value="Contractor Code">Contractor Code</option>
                    </select>

                </div>
            </div>


            {loading ? (
                <Loader />
            ) : logs.length === 0 ? (
                <>
                    <p>No Logs present</p>

                </>
            ) : (


                <MDBContainer fluid className="p-0 mt-4 d-flex" style={{
                    position: "sticky",
                    top: "50rem",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: 'row'

                }}>

                    <MDBCol>
                        <div className={styles.tableWrapper}>
                            {search === "Logged" ? (
                                <div>
                                    <table className={`table table-bordered ${styles.table}`}>
                                        <thead>
                                            <tr>
                                                <th>User</th>
                                                <th>Action</th>
                                                <th>Date</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {logs.map((log, index) => {
                                                // Split the log message into three parts: username, action, and timestamp
                                                const parts = log.logs.split(", ");

                                                // Check if the parts array has the expected length
                                                if (parts.length >= 4) {
                                                    // Extract the parts
                                                    const username = parts[0].split(": ")[1];
                                                    const actionWithDate = parts[1];
                                                    const date = parts[2];
                                                    const time = parts[3].split(" at ")[1]; // Extract only the time part
                                                    const action = actionWithDate.substring(0, actionWithDate.lastIndexOf(" ") + 1);

                                                    return (
                                                        <tr key={index}>
                                                            <td style={{ cursor: "initial" }}>{username}</td>
                                                            <td style={{ cursor: "initial" }}>{action}</td>
                                                            <td style={{ cursor: "initial" }}>{date}</td>
                                                            <td style={{ cursor: "initial" }}>{time}</td>
                                                        </tr>
                                                    );
                                                } else {
                                                    // Handle the case where the log message does not have the expected format
                                                    console.error("Invalid log format:", log);
                                                    return null; // Skip rendering this log
                                                }
                                            })}

                                        </tbody>

                                    </table>
                                </div>

                            ) : (
                                <div>
                                    <table className={`table table-bordered ${styles.table}`}>

                                        <tbody>
                                            {logs.map((log, index) => (
                                                <tr key={index}>
                                                    <td style={{ cursor: "initial" }}>{log.logs}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className={styles.pagination}>

                            <button
                                className={`${styles.pageNumber} ${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
                                onClick={handlePreviousPage}
                                disabled={currentPage === 1}
                            >
                                &lt; Previous
                            </button>

                            {/* Page number buttons */}
                            <button>
                                {currentPage}
                            </button>
                            {/* Button to go to next page */}
                            <button
                                className={`${styles.pageNumber} ${styles.paginationButton} ${currentPage === lastPage ? styles.disabled : ''}`}
                                onClick={handleNextPage}
                                disabled={currentPage === lastPage}
                            >
                                Next &gt;
                            </button>
                        </div>
                    </MDBCol>
                </MDBContainer>
            )}
        </>
    )
}
