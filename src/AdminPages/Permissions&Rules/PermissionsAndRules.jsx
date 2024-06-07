import React, { useEffect, useState } from "react";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";

// import ProgressBar from "../../CommonUtitlites/Loader/ProgressBar";
import Loader from "../../CommonUtitlites/Loader/Loader";
import { userId, role, userName } from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";
import AddRoles from "./AddRoles";
import { formatDateCustom } from "../../CommonUtitlites/Others/formattingDateAndName";
import DateEnabled from "./DateEnabled";
import styles from '../TableModule/TableSticky.module.css';


export default function PermissionsAndRoles() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const [roles, setRoles] = useState([])
  useEffect(() => {
    const getAllRoles = async () => {
      setLoading(true);
      let result2 = api.post('/get-all-roles', { userId, role, userName })
      result2 = await errorHandler(result2)
      setRoles(result2.data.data)
      setLoading(false);
    }
    getAllRoles();
  }, [])

  return (
    <>
      <div>
        <div className="title">
          <span>Permissions And Roles</span>
          <div></div>
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
        </div>
        <div
          className="container d-flex mt-3"
          style={{ justifyContent: "space-between" }}
        >
          <div>
            <span>Add roles and permissions as your needs</span>
          </div>
          <button
            type="button"
            id="addRole"
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#myModal"
            onClick={handleOpenModal}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <i class="fas fa-user-gear"></i>
            <b> &nbsp; Add Roles</b>
          </button>
          <button
            type="button"
            id="enableDate"
            className="btn btn-sm btn-outline-primary"

            onClick={() => setIsModalOpen2(true)}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <i class="fas fa-user-gear"></i>
            <b> &nbsp; Enable Date</b>
          </button>
        </div>


        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Add Role"}
          size={"xl"}
        >

          <AddRoles />

        </CustomModal>
        <CustomModal
          isOpen={isModalOpen2}
          onClose={() => setIsModalOpen2(false)}
          title={"Enable Dates"}
          size={"xl"}
        >
          <DateEnabled />
        </CustomModal>

      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
          <div className={`${styles.tableWrapper} col`}>
            <table className={`${styles.table} table`}>
              <thead className={`${styles.stickyHeader} sticky`}>
                <tr>
                  <th >Role</th>
                  <th >Date Of Creation</th>
                  <th >Last Modified</th>
                </tr>
              </thead>
              <tbody>
                {
                  roles.map(role => (
                    <tr key={role.id}>
                      <td >{role.name}</td>
                      <td >{formatDateCustom(new Date(role.createdAt))}</td>
                      <td >{formatDateCustom(new Date(role.updatedAt))}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      )}

    </>
  );
}
