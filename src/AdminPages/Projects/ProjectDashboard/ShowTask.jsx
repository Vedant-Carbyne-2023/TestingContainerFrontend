import React, { useEffect, useState } from "react";

export default function ShowTask({taskDetails}){
    // Perform a null check before accessing 'taskDetails' properties
  if (!taskDetails) {
    console.log('taskDetails is NULL');
    return null; // Return early if 'taskDetails' is null or undefined
  }
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
              <div className="form-group">
                  <label htmlFor="assignedTo">Assigned To: </label>
                  <input
                  disabled
                    className="form-control"
                    type="text"
                    id="assignedTo"
                    value={taskDetails.taskAssignedTo}
                    name="assignedTo"
                  />
              </div>
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
                  <label htmlFor="taskDescription">Task Description: </label>
                  <input
                  disabled
                    className="form-control"
                    type="text"
                    id="taskDescription"
                    value={taskDetails.taskDescription}
                    name="taskDescription"
                  />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                  <label htmlFor="taskStatus">Task Status: </label>
                  <input
                  disabled
                    className="form-control"
                    type="text"
                    id="taskStatus"
                    value={taskDetails.taskStatus}
                    name="taskStatus"
                  />
              </div>
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
                    value={taskDetails.is_completed?'Yes':'No'}
                    name="complete"
                  />
              </div>
              {taskDetails.taskUpdate && taskDetails.taskUpdate !==null ? (
                <div className="form-group">
                <label htmlFor="taskUpdate">Task Update: </label>
                <input
                disabled
                  className="form-control"
                  type="text"
                  id="taskUpdate"
                  value={taskDetails.taskUpdate}
                  name="taskUpdate"
                />
            </div>
              ) : null }
            </div>
            </div>
        </div>
    );
}