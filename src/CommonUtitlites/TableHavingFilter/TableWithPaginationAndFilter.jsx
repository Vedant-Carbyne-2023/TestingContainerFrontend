import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { formatDate } from "../Others/formattingDateAndName";
import { api } from "../AxiosSetup/axiosDefault";
import { errorHandler } from "../Others/errorHandle";
import { role, userId, userName } from "../Others/commonExportVariable";
import useGetAllProjectsForAdmin from "../customHooks/useGetAllProjectsForAdmin";
import styles from './TableWithPagination.module.css'
export default function TableWithPaginationAndFilter({
  headers,
  amend_permission,
  handleSearch,
  apiRoute,
  setHandleSearch,
  toggle
}) {
  const [loading, setLoading] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [pageLimit, setPageLimit] = useState(10);
  const [query, setQuery] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [pageOccupied, setPageOccupied] = useState(1);
  // const [toggle, setToggle] = useState("");
  // const projects = useGetAllProjectsForAdmin();
  const projects = [];

  const getDocuments = async (filterData = "") => {
    setLoading(true);
    try {
      const response = await api.post(apiRoute, {
        userId,
        userName,
        role,
        filter: filterData,
        pageOccupied,
        pageLimit,
        projectName: projectName || "",
      });

      if (!response.data) {
        throw new Error("No data received from the server");
      }

      setDocuments(response.data.data);
      setTotalPages(response.data.totalWorkOrders);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      getDocuments(query);
    } else {
      getDocuments();
    }
  }, [pageLimit, pageOccupied, handleSearch, projectName, toggle]);

  const renderPageButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`btn btn-outline-primary ${
            i === pageOccupied ? "active" : ""
          }`}
          onClick={() => setPageOccupied(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
<div className={`${styles.containerFluid} container-fluid`}>    <div className="col-md-12">
      <div className="row">
        <div className="col-md-4">
          <div className="mb-1">
            <label htmlFor="projectSelect" className="form-label">
              Select Project
            </label>
            <select
              className="form-control"
              id="projectSelect"
              onChange={(e) => setProjectName(e.target.value)}
              value={projectName}
            >
              <option value="">Select a Company</option>
              {projects &&
                projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="col-md-4">
          <label htmlFor="pageLimit" className="form-label">
            Documents To Show per Page
          </label>
          <select
            className="form-control"
            value={pageLimit}
            onChange={(e) => setPageLimit(e.target.value)}
          >
            {[10, 25, 50, 100].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label htmlFor="filterData" className="form-label">
            Search by Keywords
          </label>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter keywords"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
           
              <i className="fas fa-search" style={{cursor:"pointer"}} onClick={() => setHandleSearch(!handleSearch)}></i>

          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <Loader />
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th key={index}>{header.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {documents.map((item, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, columnIndex) => (
                      <td key={columnIndex}>
                        {" "}
                        {header.renderItem(item)
                          ? header.renderItem(item)
                          :  header.renderItem(item).props?header.renderItem(item).props.children:""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-12 d-flex justify-content-center">
          <div className="btn-group" role="group" aria-label="Page navigation">
            {renderPageButtons()}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
