import React, { useEffect, useState } from "react";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";

export default function Organisation() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };


  return (
    <>
      <div>
        <div className="title">
          <span>Organisation(s)</span>
          <div>
            <button
              type="button"
              id="addMember"
              class="btn btn-sm btn-outline-primary"
              data-toggle="modal"
              data-target="#myModal"
              onClick={handleOpenModal}
              style={{ borderColor: "navy", zIndex: "100" }}
            >
              <i class="fas fa-user-plus"></i><b> &nbsp; Add Organisation</b>
            </button>
          </div>

        </div>
      


        <CustomModal isOpen={isModalOpen} onClose={handleCloseModal} title={"Add Organisation"}>
            <div className="m-3 p-2">
        <h6>Organisation Name</h6>
        <input name="orgName" id="orgName" placeholder="Enter Organisation Name"></input>
        </div>
        <div className="m-3 p-2">
        <h6>Organisation Address</h6>
        <input name="orgAdd" id="orgAdd"  placeholder="Enter Organisation Address"></input>

        <button className="btn mx-auto d-flex mt-4">Submit</button>
        </div>
        
      </CustomModal>
      <div className="container-fluid">
      <div className="mt-4">
      <div className="row p-0 m-0 justify-content-center">
      <div className="col-md-10 col-lg-6 mx-auto">
        <div className="card" style={{ borderRadius: '25px' }}>
          <div className="card-body">
            <div className="row">
            <div className="col-md-4 order-1 order-md-1">
              <img src="../carbyne.jpg"  width="100px" style={{ float: 'left' }} alt="Organization Logo" />
              </div>
              <div className="col-md-8 order-2 order-md-2">
                <h5 className="card-title mb-4">Carbyne Infrastructure Pvt. Ltd.</h5>
                <p className="card-text"><strong>Address: </strong>B-11, Third Floor B Block Noida, Gautam Buddha Nagar, Uttar Pradesh, India Pin 201301</p>
                <p className="card-text"><strong>CIN: </strong> U74110UP1993PTC015005</p>
                <button className="btn btn-primary" id="editButton"><i className="far fa-edit"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
      </div>
    </>
  );
}
