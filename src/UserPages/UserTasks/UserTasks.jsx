import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';

import { authenticateUser } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import Card from "./Card";
import ShowTask from "./ShowTask";
import {
    userId,
    role,
    userName
  } from  "../../CommonUtitlites/Others/commonExportVariable";
  import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardHeader,
    MDBCardBody,
    MDBCardImage,
  } from 'mdb-react-ui-kit';

export default function UserTasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const [taskDetails, setTaskDetails] = useState(null);
  const [upcomingTaskDetails, setUpcomingTaskDetails] = useState(null);
  const [currentTaskDetails, setCurrentTaskDetails] = useState(null);
  const [delayedTaskDetails, setDelayedTaskDetails] = useState(null);
  const [completedTaskDetails, setCompletedTaskDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const showTask = (taskId) => {
  
      // code for getting data from our api
      async function getParticularTask() {
        setLoading(true);
         try{
            setTaskDetails(null);
            let y_result = await api.post(`/get-singleTask`, {taskId:taskId, userId,role,userName});
            y_result = await errorHandler(y_result);
      
            if(y_result.data){
              // console.log('before naming', y_result.data.data[0]);
            // setTaskDetails(y_result.data.data);
            // assigned to name
            // let name1 = await api.post(`/get-singleUser`, {specificUserId:y_result.data.data[0].taskAssignedTo, userId,role,userName});
            // let name1 = userName;
            // name1 = await errorHandler(name1);
            let name2 = await api.post(`/get-singleUser`, {specificUserId:y_result.data.data[0].userId, userId,role,userName});
            name2 = await errorHandler(name2);
            if(name2.data){
              // console.log('got the name ', name1.data.data[0].name);
              // y_result.data.data[0].taskAssignedTo=name1.data.data[0].name;
              y_result.data.data[0].userId=name2.data.data[0].name;
              // console.log('yashapi',y_result.data.data[0]);
              setTaskDetails(y_result.data.data[0]);
            }
            // if(name2.data){
            //   console.log('got the admin name ', name2.data.data[0].name);
            //   y_result.data.data[0].userId=name2.data.data[0].name;
              
            // }
              // console.log('yashapi',y_result.data.data[0]);
              // console.log(y_result.data.data[0]);
              // console.log(y_result.data.data[0].userId);
              // console.log('yash2',y_result);
              // console.log('yash3',y_result);
              // setTaskDetails(y_result.data.data[0]);
            }
            setLoading(false);
         } catch (error) {
          // Handle errors
          console.error('Error fetching data:', error);
          setLoading(false);
          // You can set an error state or handle the error in any way you prefer.
        }
      }
      getParticularTask();
      // console.log('came into showTask',taskId);
      setIsModalOpen3(true);
    };
  
  useEffect(() => {
      const authenticateAndFetch = async () => {
        // First useEffect: Authenticate User
        const token = localStorage.getItem('token');
        await authenticateUser(token);
  
        // Second useEffect: Fetch Details
        async function getDetails() {
          setLoading(true);
          // console.log('we have', userId, role);
          let mytasks = await api.post(`/get-userAllTask`, { particularUserId: userId, userId, role, userName });
          mytasks = await errorHandler(mytasks);
          if (mytasks.data) {
            // console.log('my tasks', mytasks.data.data);
            setTasks(mytasks.data.data);

            // now we will categorize the tasks
            const currentDate = new Date();

            // const completedTasks = mytasks.data.data.filter((task) => task.is_completed);
            const completedTasks = mytasks.data.data.filter((task) => task.hasCompleted.includes(userId));

            const otherTasks = mytasks.data.data.filter((task) => !task.hasCompleted.includes(userId));
          
            const upcomingTasks = otherTasks.filter((task) => {
              const deadlineDate = new Date(task.deadline);
              return currentDate < deadlineDate && currentDate < new Date(deadlineDate - task.daysNeeded * 24 * 60 * 60 * 1000);
            });
          
            const currentTasks = otherTasks.filter((task) => {
              const deadlineDate = new Date(task.deadline);
              return currentDate >= deadlineDate - task.daysNeeded * 24 * 60 * 60 * 1000 && currentDate < deadlineDate;
            });
          
            const delayedTasks = otherTasks.filter((task) => {
              const deadlineDate = new Date(task.deadline);
              return currentDate >= deadlineDate;
            });
            // console.log('completed', completedTasks);
            // console.log('upcoming', upcomingTasks);
            // console.log('current', currentTasks);
            // console.log('delayed', delayedTasks);
            setUpcomingTaskDetails(upcomingTasks);
            setCurrentTaskDetails(currentTasks);
            setDelayedTaskDetails(delayedTasks);
            setCompletedTaskDetails(completedTasks);
          }
          setLoading(false);
        }
        getDetails();
      };
  
      authenticateAndFetch();
    }, []);
    return (
      <>
      <div className="title">
           <span>TASKS </span>
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

      {/* our tasks will be shown here */}
      { loading?<Loader/>:<div>
        <MDBContainer>
        <MDBRow className="p-0 m-0">
        {/* <div className="row p-0 m-0"> */}
          {/* left side */}
          <MDBCol md="6" className="mt-4">
          {/* <div className="col-md-6 mt-4"> */}
          <MDBCard>
          {/* <CustomCard title="Project Details">           */}
          <MDBCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mt-2">Completed Tasks</h5>
            </div>
          </MDBCardHeader>
          <MDBCardBody>
             <MDBRow className="no-gutters">
                  <MDBCardBody>
                    <div className="mb-2">
                      <div style={{ height: '30vh', overflowX: 'auto' }}>
                      { completedTaskDetails &&completedTaskDetails.map((task) => (
                              <MDBRow className="p-0 m-0" key={task.taskId}>
                                <MDBCol md="8">
                                <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', display: 'flex' }}>
                                   <h6 style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                                     {task.taskName}
                                   </h6>
                                </span>
                                </MDBCol>
                              </MDBRow>
                        ))}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBRow>
                </MDBCardBody>
           {/* </CustomCard> */}
           </MDBCard>
           <div className="mt-4">
           <MDBCard>
           <MDBCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mt-2">Current Tasks</h5>
            </div>
           </MDBCardHeader>
            <MDBCardBody>
             <MDBRow className="no-gutters">
                  <MDBCardBody>
                    <div className="mb-2">
                      <div style={{ height: '30vh', overflowX: 'auto' }}>
                      {currentTaskDetails && currentTaskDetails.map((task) => (
                              <MDBRow className="p-0 m-0" key={task.taskId}>
                                <MDBCol md="8">
                                <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', display: 'flex' }}>
                                   <h6 style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                                     {task.taskName}
                                   </h6>
                                </span>
                                </MDBCol>
                              </MDBRow>
                        ))}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBRow>
                </MDBCardBody>
           {/* </CustomCard> */}
           </MDBCard>
           </div>
            
          </MDBCol>
          {/* right side */}
          <MDBCol md="6" className="mt-4">
           <MDBCard>
           <MDBCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mt-2">Upcoming Tasks</h5>
            </div>
           </MDBCardHeader>
            <MDBCardBody>
             <MDBRow className="no-gutters">
                  <MDBCardBody>
                    <div className="mb-2">
                      <div style={{ height: '30vh', overflowX: 'auto' }}>
                      {upcomingTaskDetails && upcomingTaskDetails.map((task) => (
                              <MDBRow className="p-0 m-0" key={task.taskId}>
                                <MDBCol md="8">
                                <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', display: 'flex' }}>
                                   <h6 style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                                     {task.taskName}
                                   </h6>
                                </span>
                                </MDBCol>
                              </MDBRow>
                        ))}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBRow>
                </MDBCardBody>
           {/* </CustomCard> */}
           </MDBCard>
           <div className="mt-4">
           <MDBCard>
           <MDBCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mt-2">Delayed Tasks</h5>
            </div>
           </MDBCardHeader>
            <MDBCardBody>
             <MDBRow className="no-gutters">
                  <MDBCardBody>
                    <div className="mb-2">
                      <div style={{ height: '30vh', overflowX: 'auto' }}>
                      {delayedTaskDetails && delayedTaskDetails.map((task) => (
                              <MDBRow className="p-0 m-0" key={task.taskId}>
                                <MDBCol md="8">
                                <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', display: 'flex' }}>
                                   <h6 style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                                     {task.taskName}
                                   </h6>
                                </span>
                                </MDBCol>
                              </MDBRow>
                        ))}
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBRow>
                </MDBCardBody>
           {/* </CustomCard> */}
           </MDBCard>
           </div>

          </MDBCol>
        </MDBRow>
        </MDBContainer>
        {/* @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ */}
      {/* <div className="mt-3">
      <Card
              title="UpComing Task"
              
            >
          <div style={{ height: '140px', overflow: 'auto' }}>
      {tasks && tasks.map((task) => {
        if (task.taskStatus  === "upcoming") {
          return (
            <div className="pl-4" key={task.taskId} style={{ marginBottom: '8px' }}>
              <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', textDecoration: 'underline', display: 'block' }}>
                <span style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                  {task.taskName}
                </span>
              </span>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
            </Card>
      <Card
              title="Current Task"
            >
          <div style={{ height: '140px', overflow: 'auto' }}>
      {tasks && tasks.map((task) => {
        if (task.taskStatus  === "current") {
          return (
            <div className="pl-4" key={task.taskId} style={{ marginBottom: '8px' }}>
              <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', textDecoration: 'underline', display: 'block' }}>
                <span style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                  {task.taskName}
                </span>
              </span>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
            </Card>
            <Card
              title="Delayed Task"
          >
          <div style={{ height: '140px', overflow: 'auto' }}>
      {tasks && tasks.map((task) => {
        if (task.taskStatus  === "delayed") {
          return (
            <div className="pl-4" key={task.taskId} style={{ marginBottom: '8px' }}>
              <span onClick={() => showTask(task.taskId)} style={{ cursor: 'pointer', textDecoration: 'underline', display: 'block' }}>
                <span style={{ backgroundColor: task.is_completed ? 'lightgreen' : 'transparent' }}>
                  {task.taskName}
                </span>
              </span>
            </div>
          );
        } else {
          return null;
        }
      })}
    </div>
           </Card>
      </div> */}
      </div>
      }
      {/* ShowTask */}
    <CustomModal
      isOpen={isModalOpen3}
      onClose={() => setIsModalOpen3(false)}
      title={"Task View"}
      size={"xl"}
    >
      {/* <h1>Present in ShowTask CustomModal</h1> */}
       <ShowTask taskDetails={taskDetails} />
    </CustomModal>
      </>
    )
}