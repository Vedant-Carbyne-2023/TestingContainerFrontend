import React, { useState } from "react";
import styles from "./project.module.css"; // Import the CSS module
import image from "./img.png";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";


const ProjectCard = ({ project, permission_id, refresh }) => {
    // console.log(project)
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate()
    const [status, setStatus] = useState(false)
    const handleSubmit = async(e) =>{
      e.preventDefault();
      const formData = new FormData(e.target)
      let data={};
      data.projectId = project.id,
      data.projectCode = formData.get("projectCode")
      data.companyName = formData.get("companyName")
      data.companyAddress = formData.get("companyAddress")
      data.companyCode = formData.get("companyCode")
      data.companyBillingAddress = formData.get("companyBillingAddress")
      data.companyDeliveryAddress = formData.get("companyDeliveryAddress")

      let result = api.post('/edit-project', data)
      result = await errorHandler(result)
      setStatus(!status)
      refresh(status)
      Swal.fire({
        title:result.data.message,
        timer:2000
      })
    }

  return (
  <div className="col-md-4">
  <div className={styles.card} onClick={() => navigate(`/user/projectDashboard?id=${project.id}`)}>
    <div className="row no-gutters fullwidth">
      <div className="col-md-4 col-3 d-flex m-auto">
        <img src={image} className={styles.card_img} alt="Project Image" />
      </div>
      <div className="col-md-8 col-9">
        <div className="card-body">
          <h6 className="card-title">{project.name}</h6>
          <div className="mb-2">
            <span>Project Code :{" "}</span>
            <span>{project.projectCode}</span>
          </div>
          <div className="mb-2">
            <span>Generated Date</span>
            <span>{formatDate(new Date(project.createdAt))}</span>
          </div>
          <div>
            <span>Updated At Date</span>
            <span>{formatDate(new Date(project.updatedAt))}</span>
          </div>
         
        </div>
      </div>
    
    </div>
  </div>
        <button
          type="button"
          style={{    top: "1rem",  position: "absolute", right: "2rem"}}
            className="btn" // Adjust the classes as needed for styling
            onClick={(e) => {
              setModalOpen(true)
            
            }}
          >
            <i className="fas fa-edit"></i>
          </button>
<CustomModal
isOpen={modalOpen}
onClose={()=>setModalOpen(false)}
title="Edit Project"
>
<div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="projectName" className="form-label">
            Project Name:
          </label>
          <input
            type="text"
            name="projectName"
            className="form-control"
            id="projectName"
            disabled
            defaultValue={project.name}
            // onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="projectCode" className="form-label">
            Project Code:
          </label>
          <input
            type="text"
            name="projectCode"
            className="form-control"
            id="projectCode"
            defaultValue={project.projectCode}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyName" className="form-label">
            Company Name:
          </label>
          <input
            type="text"
            name="companyName"
            className="form-control"
            id="companyName"
            defaultValue={project.companyName}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyCode" className="form-label">
            Company Short Code For Id Generation:
          </label>
          <input
            type="text"
            name="companyCode"
            className="form-control"
            id="companyCode"
            defaultValue={project.companyCode}
            required
          />
        </div>

        <div className="mb-3">
              <label htmlFor="companyAddress" className="form-label">
                Company Address:
              </label>
              <textarea
                type="text"
                name="companyAddress"
                className="form-control"
                id="companyAddress"
                defaultValue={project.companyAddress}
                required
              />
            </div>

        <div className="mb-3">
          <label htmlFor="companyBillingAddress" className="form-label">
            Company Billing Address:
          </label>
          <textarea
            type="text"
            name="companyBillingAddress"
            className="form-control"
            id="companyBillingAddress"
            defaultValue={project.companyBillingAddress}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="companyDeliveryAddress" className="form-label">
            Company Delivery Address:
          </label>
          <textarea
            type="text"
            name="companyDeliveryAddress"
            className="form-control"
            id="companyDeliveryAddress"
            defaultValue={project.companyDeliveryAddress}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
</CustomModal>
  </div>


  );
};

export default ProjectCard;
