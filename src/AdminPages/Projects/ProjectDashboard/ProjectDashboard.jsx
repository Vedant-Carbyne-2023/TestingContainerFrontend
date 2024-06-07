import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../Projects/project.module.css";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import useGetAllMembersInDatabase from "../../../CommonUtitlites/customHooks/useGetAllMembersInDatabase";
import useGetAllContractors from "../../../CommonUtitlites/customHooks/useGetAllContractors";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import Swal from 'sweetalert2';
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";

// Components
import Card from "./Card";
import Form from "./Form";
import AddMemberForm from "./AddMemberForm";
import AddVendorForm from "./AddVendorForm";
import AddContractorForm from "./AddContractorForm";
import ShowTask from "./ShowTask";
import Loader from "../../../CommonUtitlites/Loader/Loader"
import ProjectWise from "./StockReport/ProjectWise/ProjectWise";
import GpWise from "./StockReport/GpWise/GpWise";
import VendorWise from "./StockReport/VendorWise/VendorWise";
import ContractorWise from "./StockReport/ContractorWise/ContractorWise";
import PurchaseOrders from "./Documents/PurchaseOrders/PurchaseOrders";
import WorkOrders from "./Documents/WorkOrders/WorkOrders";
import MRN from "./Documents/MRN/MRN";
import MIN from "./Documents/MIN/MIN";
import RecieptNotes from "./Documents/RecieptNotes/RecieptNotes";
import AddGpForm from "./AddGpForm";

export default function ProjectDashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [status, setStatus] = useState(false);

  // To store a particular taskDetails to show
  const [taskDetails, setTaskDetails] = useState(null);
  const showTask = (taskId) => {
    console.log('data', taskId, userId, role);
    async function getParticularTask() {
       try{
          setTaskDetails(null);
          let y_result = await api.post(`/get-singleTask`, {taskId:taskId, userId,role,userName});
          y_result = await errorHandler(y_result);
    
          if(y_result.data){
          let name1 = await api.post(`/get-singleUser`, {specificUserId:y_result.data.data[0].taskAssignedTo, userId,role,userName});
          name1 = await errorHandler(name1);
          let name2 = await api.post(`/get-singleUser`, {specificUserId:y_result.data.data[0].userId, userId,role,userName});
          name2 = await errorHandler(name2);
          if(name1.data&&name2.data){
            console.log('got the name ', name1.data.data[0].name, name2.data.data[0].name);
            y_result.data.data[0].taskAssignedTo=name1.data.data[0].name;
            y_result.data.data[0].userId=name2.data.data[0].name;
            console.log('yashapi',y_result.data.data[0]);
            setTaskDetails(y_result.data.data[0]);
          }
          }
       } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
        // You can set an error state or handle the error in any way you prefer.
      }
    }
    getParticularTask();
    console.log('came into showTask',taskId);
    setIsModalOpen3(true);
  };

  useEffect(() => {
    async function getDetails() {
      setLoading(true);
      try {
        const [projectRes, tasksRes] = await Promise.all([
          api.post(`/single-project?id=${id}`, { userId, role, userName }),
          api.post(`/get-allTaskOfAProject`, { projectId: id, userId, role, userName }),
        ]);

        const { data: projectData } = await errorHandler(projectRes);
        if (projectData) {
          setProject(projectData.data.project);
          console.log('check project', projectData.data.project);
        }

        const { data: tasksData } = await errorHandler(tasksRes);
        if (tasksData) {
          setTasks(tasksData.data);
          console.log('yash tasks', tasksData.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project and tasks:", error);
        setLoading(false);
      }
    }
    getDetails();
  }, [id, status]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);
  const [activeComponent, setActiveComponent] = useState("project");
  const [activeComponent2, setActiveComponent2] = useState("purchaseOrder");
  const [isModalOpen6, setIsModalOpen6] = useState(false);
  const navigate = useNavigate();
  const members = useGetAllMembersInDatabase();
  const vendors = useGetVendors();
  const contractors = useGetAllContractors();


  const findName = (mem) => {
    const member = members.find((mem_id) => mem_id.id === mem);
    return member ? member.name : "";
  };
  const findRole = (mem) => {
    const member = members.find((mem_id) => mem_id.id === mem);
    return member ? member.role : "";
  };

  const findNameContractor = (mem) => {
    const contractor = contractors.find((mem_id) => mem_id._id === mem);
    return contractor ? contractor.contractorName : "";
  };
  const findCategoryContractor = (mem) => {
    const contractor = contractors.find((mem_id) => mem_id._id === mem);
    return contractor ? contractor.category.join(', ') : "";
  };

  const findNameVendor = (mem) => {
    const vendor = vendors.find((mem_id) => mem_id._id === mem);
    return vendor ? vendor.vendorName : "";
  };
  const findCategoryVendor = (mem) => {
    const vendor = vendors.find((mem_id) => mem_id._id === mem);
    return vendor ? vendor.category.join(', ') : "";
  };


  const renderTaskCards = (tasks, title, stat) => {
    return (
      <Card title={title} className={styles.card_2}>
      <div style={{ height: '6vw', overflow: 'auto' }}>
        {tasks && tasks.map((task) => {
          if (task.taskStatus === stat) {
            return (
              <div className="pl-4" key={task.taskId} style={{ marginBottom: '8px' }}>
                <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', display: 'block' }}>
                  <h7 style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                    {task.taskName}
                  </h7>
                </span>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </Card>
    );
  };


  const CustomCard = ({ title, children, buttonText, onButtonClick }) => {
    return (
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title mt-2">{title}</h5>
            <button onClick={onButtonClick} className="btn btn-sm btn-outline-primary">
              {buttonText}
            </button>
          </div>
        </div>
        <div className="card-body">{children}</div>
      </div>
    );
  };


  return (
    <>
      <div className="title">
        <h5 style={{ fontWeight: "bold", marginBottom: "0" }}>
          {project && project.name}
        </h5>
        <div>
          <button
            type="button"
            id="addTask"
            className="btn btn-sm btn-outline-primary"
            data-toggle="modal"
            data-target="#myModal"
            onClick={() => setIsModalOpen(true)}
            style={{ borderColor: "navy", zIndex: "100" }}
          >
            <i className="fas fa-plus"></i> <b>&nbsp; Add Task</b>
          </button>
        </div>
        {/* <div className="search-bar">
          <input type="text" className="form-control" placeholder="Search" />
          <div className="search-icon-container">
            <div className="search-icon">
              <div className="icon">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {  loading?<Loader/>:project && (
        <div className="container">
          <div className="row p-0 m-0">
            {/* left side */}
            <div className="col-lg-6 mt-4">
            <CustomCard title="Project Details">      
            <div className="row no-gutters ">
             <div className="card-body">
                      <div className="mb-2">
                        <div style={{ height: '30vh', overflowX: 'auto' }}>
                        <div className="row p-0 m-0">
                        <div className="col-md-8">
                          <h3 style={{ fontWeight: "bold", marginBottom: "0" }}>
                            {project && project.name}
                          </h3>
                        </div>
                        </div>
                        <div className="mt-4">
                        <div className="row p-0 m-0">
                        <div className="col-md-8">
                          <div className="mt-2">
                            <h6>Generated Date: </h6>
                            <h6>{formatDate(new Date(project.createdAt))}</h6>
                          </div>
                        </div>
                        </div>
                        <div className="row p-0 m-0">
                        <div className="col-md-8">
                          <div className="mt-2">
                            <h6>Last Updated At Date: </h6>
                            <h6>{formatDate(new Date(project.updatedAt))}</h6>
                          </div>
                        </div>
                        </div>
                        </div>
                        </div>
                      </div>
                  </div>
                  </div>
             </CustomCard>
              {/* <div className="mt-3">
              {renderTaskCards(tasks, "UpComing Task", "upcoming")}
              {renderTaskCards(tasks, "Current Task", "current")}
              {renderTaskCards(tasks, "Delayed Task", "delayed")}
              </div> */}
            </div>

            {/* right side */}
            <div className="col-lg-6 mt-4">
            <CustomCard title="Vendors Assigned To Project" buttonText="Add Vendor" onButtonClick={() => setIsModalOpen4(true)}>          
           <div className="row no-gutters ">
             <div className="card-body">
               <div className="mb-2">
                

                 <div style={{ height: "30vh", overflowX: "auto" }}>
                   {project.vendorAssignedTo.map((name, index) => (
                     <div className="row p-0 m-0">
                       <div className="col-md-8">
                     <h6 key={index}>{findNameVendor(name)}</h6>
                     </div>
                     <div className="col-md-4  ">
                     <p key={index}>{findCategoryVendor(name)}</p>
                     </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
         </CustomCard>
            </div>
          </div>
          <div className="row p-0 m-0">
            {/* left side */}
            <div className="col-lg-6 mt-4">
            <CustomCard title="Members Assigned To Project" buttonText="Add Member" onButtonClick={() => setIsModalOpen2(true)}>
            <div className="row no-gutters ">
             <div className="card-body">
               <div className="mb-2">
                

                 <div style={{ height: "30vh", overflowX: "auto" }}>
                   {project.assignedTo.map((name, index) => (
                     <div className="row p-0 m-0">
                       <div className="col-md-8">
                     <h6 key={index}>{findName(name)}</h6>
                     </div>
                     <div className="col-md-4 ">
                     <p key={index}>{findRole(name)}</p>
                     </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>
             
           </CustomCard>
            </div>
            <div className="col-lg-6 mt-4">
            <CustomCard title="Contractors Assigned To Project" buttonText="Add Contractor" onButtonClick={() => setIsModalOpen5(true)}>     
            <div className="row no-gutters ">
             <div className="card-body">
               <div className="mb-2">
                

                 <div style={{ height: "30vh", overflowX: "auto" }}>
                   {project.contractorAssignedTo.map((name, index) => (
                     <div className="row p-0 m-0">
                       <div className="col-md-8">
                     <h6 key={index}>{findNameContractor(name)}</h6>
                     </div>
                     <div className="col-md-4">
                     <p key={index}>{findCategoryContractor(name)}</p>
                     </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>     
             </CustomCard>
            </div>
          </div>
 
          <div className="row p-0 m-0" style={{justifyContent:'center'}}>
            {/* left side */}
            <div className="col-lg-6 mt-4">
            <CustomCard title="GP Alloted For Project" buttonText="Add GPs" onButtonClick={() => setIsModalOpen6(true)}>
            <div className="row no-gutters">
             <div className="card-body">
               <div className="mb-2">
                

                 <div style={{ height: "30vh", overflowX: "auto" }}>
                   {project.gpName.map((gp, index) => (
                     <div className="row p-0 m-0" key={gp._id}>
                       <div className="col">
                     <h6>{gp.name}</h6>
                     </div>
                     </div>
                   ))}
                 </div>
               </div>
             </div>
           </div>     
           </CustomCard>
            </div>
            </div>
          {/* Stock Reports */}
          <div className="mt-4">
          <div className="row p-0 m-0" style={{ overflow: 'auto' }}>
          <div className="col">
          <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mt-2">Stock Reports</h5>
                  <button onClick={() => setActiveComponent("project")} className={`btn btn-sm btn-outline-primary ${activeComponent === "project" ? "active" : ""}`}>
                   Project-wise
                  </button>
                  <button  onClick={() => setActiveComponent("gp")} className={`btn btn-sm btn-outline-primary ${activeComponent === "gp" ? "active" : ""}`}>
                    Gp-wise
                  </button>
                  {/* <button  onClick={() => setActiveComponent("vendor")} className={`btn btn-sm btn-outline-primary ${activeComponent === "vendor" ? "active" : ""}`}>
                    Vendor-wise
                  </button>
                  <button  onClick={() => setActiveComponent("contractor")} className={`btn btn-sm btn-outline-primary ${activeComponent === "contractor" ? "active" : ""}`}>
                    Contractor-wise
                  </button> */}
                </div>
              </div>
              <div className="card-body">
              <div style={{ height: '60vh', overflowX: 'auto' }}>
              {activeComponent && activeComponent === "project" && (
                  project&&<ProjectWise project={project}/>
              )}
              {activeComponent && activeComponent === "gp" && (
                  project&&<GpWise project={project} />
              )}
              {activeComponent && activeComponent === "vendor" && (
                  project&&<VendorWise project={project}/>
              )}
              {activeComponent && activeComponent === "contractor" && (
                  project&&<ContractorWise project={project}/>
              )}
              </div>
              </div>
            </div>
            </div>
          </div>
          </div>

          {/* Project po,wo,mrn,min */}
          <div className="mt-4">
          <div className="row p-0 m-0" style={{ overflow: 'auto' }}>
          <div className="col">
          <div className="card">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="card-title mt-2">Project Documents</h5>
                  <button onClick={() => setActiveComponent2("purchaseOrder")} className={`btn btn-sm btn-outline-primary ${activeComponent2 === "purchaseOrder" ? "active" : ""}`}>
                   PurchaseOrders
                  </button>
                  <button  onClick={() => setActiveComponent2("workOrder")} className={`btn btn-sm btn-outline-primary ${activeComponent2 === "workOrder" ? "active" : ""}`}>
                    WorkOrders
                  </button>
                  <button  onClick={() => setActiveComponent2("mrn")} className={`btn btn-sm btn-outline-primary ${activeComponent2 === "mrn" ? "active" : ""}`}>
                    MRN(Requisition)
                  </button>
                  <button  onClick={() => setActiveComponent2("min")} className={`btn btn-sm btn-outline-primary ${activeComponent2 === "min" ? "active" : ""}`}>
                    MIN
                  </button>
                  <button  onClick={() => setActiveComponent2("mrn2")} className={`btn btn-sm btn-outline-primary ${activeComponent2 === "mrn2" ? "active" : ""}`}>
                    MRN(Reciept)
                  </button>
                </div>
              </div>
              <div className="card-body">
              <div style={{ height: '60vh', overflowX: 'auto' }}>
              {activeComponent2 && activeComponent2 === "purchaseOrder" && (
                  project&&<PurchaseOrders project={project}/>
              )}
              {activeComponent2 && activeComponent2 === "workOrder" && (
                  project&&<WorkOrders project={project} />
              )}
              {activeComponent2 && activeComponent2 === "mrn" && (
                  project&&<MRN project={project}/>
              )}
              {activeComponent2 && activeComponent2 === "min" && (
                  project&&<MIN project={project}/>
              )}
              {activeComponent2 && activeComponent2 === "mrn2" && (
                  project&&<RecieptNotes project={project}/>
              )}
              </div>
              </div>
            </div>
            </div>
          </div>
          </div>

          {/* Sample Gantt Charts */}
          <div className="d-flex justify-content-center mt-3">
              <h5>Gantt Charts</h5>
          </div>
          <div className="row p-0 m-0" style={{ overflow: 'auto' }}>
          <div className="col d-flex justify-content-center mt-4 mb-4">
          <img src="https://support.content.office.net/en-us/media/b7218d7a-3313-4685-bc75-93efc939cff1.png" alt="Gantt Chart1" />
          </div>
          </div>
        </div>
      )}


      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"Add Task"}
      >
          <Form assgndTo={project?project.assignedTo:""} id={id}/>
      </CustomModal>


      <CustomModal
        isOpen={isModalOpen2}
        onClose={() => setIsModalOpen2(false)}
        title={"Add Members"}
      >
        <AddMemberForm id={id} assigedMember={project ? project.assignedTo : ""} setStatus={(status)=>setStatus(status)} />
      </CustomModal>


      {/* ShowTask */}
      <CustomModal
        isOpen={isModalOpen3}
        onClose={() => setIsModalOpen3(false)}
        title={"Task View"}
      >
         <ShowTask taskDetails={taskDetails} />
      </CustomModal>
      <CustomModal
        isOpen={isModalOpen4}
        onClose={() => setIsModalOpen4(false)}
        title={"Add Vendors"}
      >
        <AddVendorForm id={id} assigedVendor={project? project.vendorAssignedTo: ""} setStatus={(status)=>setStatus(status)} />
      </CustomModal>
      <CustomModal
        isOpen={isModalOpen5}
        onClose={() => setIsModalOpen5(false)}
        title={"Add Contractors"}
      >
        <AddContractorForm id={id} assigedContractor={project ? project.contractorAssignedTo : ""} setStatus={(status)=>setStatus(status)} />
      </CustomModal>

      <CustomModal
        isOpen={isModalOpen6}
        onClose={() => setIsModalOpen6(false)}
        title={"Add Gps"}
      >
        <AddGpForm id={id} assigedGps={project ? project.gpName : ""}  project={project} setStatus={(status)=>setStatus(status)} />
      </CustomModal>
    </>
  );
}
