import React, { useEffect, useState } from "react";

import ProjectCard from "./ProjectCard";

import useGetAllProjectsForAdmin from "../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";

import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import AddProject from "./AddProject";
import { role } from "../../../CommonUtitlites/Others/commonExportVariable";

export default function Project() {
  const [submit, setSubmit] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  let projects = useGetAllProjectsForAdmin(submit||"required");

  console.log(projects)

  return (
    <>
      <div>
        <div className="title">
          <span>Project (s)</span>
          <div>
          {
            role==="SuperUser" &&
          
            <button
              type="button"
              id="addMember"
              class="btn btn-sm btn-outline-primary"
              data-toggle="modal"
              data-target="#myModal"
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
                refresh={(data)=>setSubmit(!submit)}
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
          
          <AddProject submitStatus={(bool) => setSubmit(!submit)} />
        </CustomModal>
      </div>
    </>
  );
}

