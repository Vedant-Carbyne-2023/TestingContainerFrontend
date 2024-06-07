import React, { useEffect, useState } from "react";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {
  userId,
  role,
  userName
} from  "../../CommonUtitlites/Others/commonExportVariable";
import Loader from "../../CommonUtitlites/Loader/Loader";
export default function ShowTask({taskDetails}){
    // Perform a null check before accessing 'taskDetails' properties
  if (!taskDetails) {
    // return <div>Loading Task....</div>; // Return early if 'taskDetails' is null or undefined
    return <Loader/>;
  }
  console.log('taskDetails', taskDetails);
  const [isCompleted, setIsCompleted] = useState(taskDetails.hasCompleted.includes(userId));
  const [taskUpdate, setTaskUpdate] = useState(taskDetails.taskUpdate);
  const [taskUpdate2, setTaskUpdate2] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    async function getMembers() {
      let result = api.post("/all-users", { userId,role,userName });
      result = await errorHandler(result);
      console.log(result);
      if (result.data) {
        console.log('all users', result.data.data);
        setUsers(result.data.data);
      }
    }
    getMembers();
  }, []); 
  const findName = (mem) => {
    const user = users.find((mem_id) => mem_id.id === mem);
    return user ? user.name : "";
  };

    // let userId=localStorage.getItem('user_Id')
    // let role=localStorage.getItem('role')
    const completeIt = (taskId) =>{
    async function completeParticularTask() {
       try{
          // console.log('before api',taskId);
          let y_result = await api.post(`/update-taskCompletion`, {particularTaskId:taskId, userId,role, userName});
          y_result = await errorHandler(y_result);
    
          if(y_result.data){
            // console.log('task completed here',y_result.data);
            setIsCompleted(true);
            alert('Your task is completed!');
          }
       } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    }
    completeParticularTask();
    // console.log('came into completeTask',taskId);
  };
  const updateTaskUpdate = (taskId) => {
    async function updateTaskUpdateAPI() {
      try {
        // console.log('before updating task update', taskId, taskUpdate2);
        let y_result = await api.post(`/update-taskUpdate`, {
          particularTaskId: taskId,
          update: taskUpdate2,
          userId,
          role,
          userName
        });
        y_result = await errorHandler(y_result);

        if (y_result.data) {
          // console.log('task suggestion updated', y_result.data);
          setTaskUpdate(taskUpdate2);
          alert('Your update is added to the task!');
          // Assuming the API returns the updated task update in the response
          // Update the taskDetails.taskUpdate in the state with the new value
          // For example, if the API returns { taskSuggestion: "New Suggestion" }
          // you can do: setTaskDetails({ ...taskDetails, taskSuggestion: "New Suggestion" });
        }
      } catch (error) {
        // Handle errors
        console.error('Error updating task suggestion:', error);
      }
    }
    updateTaskUpdateAPI();
  };

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };
  const formattedDate = formatDate(taskDetails.createdAt);
  
    // now we have to get name of user using taskDetails.taskAssignedTo and taskDetails.userId
    // so design a api to get the details of an object
    return (
      <div>
      <div className="row mb-0">
       <div className="col-md-6">
       <div className="form-group">
           <label htmlFor="taskName">Task Name: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="taskName"
             value={taskDetails.taskName}
             name="taskName"
           />
       </div>
       {/* <div className="form-group">
           <label htmlFor="assignedTo">Assigned To: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="assignedTo"
             value={userName}
             name="assignedTo"
           />
       </div> */}
       <div className="form-group">
           <label htmlFor="assignedDate">Date Assigned: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="assignedDate"
             value={formattedDate}
             name="assignedDate"
           />
       </div>
       <div className="form-group">
           <label htmlFor="deadline">Deadline: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="deadline"
             value={formatDate(taskDetails.deadline)}
             name="deadline"
           />
       </div>

       
     </div>
     <div className="col-md-6">
       {/* <div className="form-group">
           <label htmlFor="taskStatus">Task Status: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="taskStatus"
             value={taskDetails.taskStatus}
             name="taskStatus"
           />
       </div> */}
       <div className="form-group">
           <label htmlFor="assignedBy">Assigned By: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="assignedBy"
             value={taskDetails.userId}
             name="assignedBy"
           />
       </div>
       <div className="form-group">
           <label htmlFor="complete">Task Completed: </label>
           <input
           disabled
             className="form-control"
             type="text"
             id="complete"
             value={isCompleted?'Yes':'No'}
             name="complete"
           />
       </div>
     </div>
     </div>
     {/* modify above this */}
     {/* <p><strong>Project ID: </strong>{taskDetails.projectId}</p> */}

     {/* <p><strong>Task Name:     </strong>{taskDetails.taskName}</p>
     <p><strong>Description:   </strong>{taskDetails.taskDescription}</p>
     <p><strong>Assigned To:   </strong>{taskDetails.taskAssignedTo}</p>
     <p><strong>Assigned By: </strong>{taskDetails.userId}</p>
     <p><strong>Status:        </strong>{taskDetails.taskStatus}</p>
     <p><strong>Date Assigned: </strong>{formattedDate}</p>
     <p><strong>Completed:     </strong>{isCompleted?'Yes':'No'}</p> */}
     <div className="row">
     <div className="col-md-12">
     <div className="form-group">
           <label htmlFor="taskDescription">Task Description: </label>
           <textarea
           disabled
             className="form-control"
             rows="3"
             id="taskDescription"
             value={taskDetails.taskDescription}
             name="taskDescription"
           />
       </div>
       </div>
       <div className="col-md-12">
       <h6>Assigned To:</h6>
       {taskDetails.taskAssignedTo.map((item) => (
                         <div className="form-group">
                              <input
                              disabled
                              type="text"
                                className="form-control"
                                rows="2"
                                value={findName(item)}
                              />
                          </div>
                   ))}
       </div>
       <div className="col-md-12">
       <h6>Task Updates: </h6>
       {taskDetails.taskUpdate.map((item) => (
                         <div className="form-group">
                              <textarea
                              disabled
                                className="form-control"
                                rows="2"
                                value={item.update}
                              />
                          </div>
                   ))}
        </div>
     </div>
     
       <div style={{ display: "flex", alignItems: "center" }}>
       <input
       type="text"
       value={taskUpdate2}
       onChange={(e) => setTaskUpdate2(e.target.value)}
       />
       <button
       type="button"
       className="btn btn-primary"
       style={{ borderRadius: '0.25rem', padding: '0.4rem 1rem' }}
       onClick={() => updateTaskUpdate(taskDetails.taskId)}
       >
       Add Update
       </button>
   </div>
     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
     {isCompleted ? null : <button type="button" className="btn btn-primary mt-2" onClick={() => completeIt(taskDetails.taskId)}>Task Completed</button>}
     </div>
 </div>
    );
}