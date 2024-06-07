import React, { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";

import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";

import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import AddProject from "./AddProject";
import { role } from "../../../CommonUtitlites/Others/commonExportVariable";
import useGetRolePermissionComponentWise from "../../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserProject({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)

  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])



  const [submit, setSubmit] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let projects = useGetAllProjectsForAdmin(submit);

  return (
    <>
      <div>
        <div className="title">
          <span>Project (s)</span>
          <div>
          {
           permissions.some(permission => permission.add === true) &&
          
            <button
              type="button"
              id="addMember"
              className="btn btn-sm btn-outline-primary"
           
              onClick={handleOpenModal}
              style={{ borderColor: "navy", zIndex: "100" }}
            >
              <i class="fas fa-plus"></i> <b>&nbsp; Add Project</b>
            </button>
            }
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
        </div>

        <div className="container-fluid p-0 m-0">
        <div className="row p-0 m-0  justify-content-center mt-3">
          {projects.length > 0
            ? projects.map((project, index) => (
                <ProjectCard key={index} project={project} 
                permission_id={permission._id}
                refresh={(data)=>setSubmit(!submit)}
                edit_permission={ permissions.some(permission => permission.edit === true)}
                />
              ))
            : projects.length == 0
            ? "No Projects"
            : "Loading"}
        </div>
        </div>

        <CustomModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={"Add Project"}
          size={"large"}
        >

          {
            permissions.some(permission => permission.add === true)
            &&
            <AddProject submitStatus={(bool) => setSubmit(!submit)}  add_permission={ permissions.some(permission => permission.add === true)} edit_permission={ permissions.some(permission => permission.edit === true)}/>


          }
          
        </CustomModal>
      </div>
    </>
  );
}

