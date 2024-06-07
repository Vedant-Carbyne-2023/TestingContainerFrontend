import React,{ useEffect, useState } from 'react';
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Swal from 'sweetalert2';
import styles from '../Projects/AddMemberInProject/CheckboxDropdown.module.css'
import {
  userId,
  role,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";

export default function Form({assgndTo, id}) {
  console.log('in form',assgndTo);
  // now assgnd to is an array from which we will select a user to assign him the task
  // but the problem is the array only consist of id we will need names to
  // therefore let's create a new useState
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
    setSelectedOptions(selectedValues);
  };
  const [members, setMembers] = useState([]);
  const [nonMembers, setnonMembers] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const handleCheckboxChange = (event) => {
    const memberId = event.target.value;
    if (event.target.checked) {
      setAssignees(prevAssignees => [...prevAssignees, memberId]);
    } else {
      setAssignees(prevAssignees => prevAssignees.filter(id => id !== memberId));
    }
  };
  useEffect(() => {
    async function getMembers() {
      let result = api.post("/all-users", { userId,role,userName });
      result = await errorHandler(result);
      if (result.data) {
        const filteredData = result.data.data.filter(item => assgndTo.includes(item.id));
        const nonfilteredData = result.data.data.filter(item => !assgndTo.includes(item.id));
        setMembers(filteredData);
        setnonMembers(nonfilteredData);
      }
    }
    getMembers();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const projectId = id;
    const desc = formData.get("taskDetails");
    const name = formData.get("taskName");
    const deadline = formData.get("deadline");
    // const assgnto = formData.get("assignedTo");
    const daysNeeded = formData.get("daysNeeded");
    console.log('frontend-check', name, assignees, daysNeeded, deadline, projectId);

    try {
      const answer = await errorHandler(
        api.post("/create-task", { projectId, desc, name, assgnto: assignees, daysNeeded, deadline, userId, role, userName })
      );
      if (answer && answer.data) {
        console.log(answer.data);
         // Use SweetAlert instead of alert
        //  setIsModalOpen(false);
         Swal.fire({
          icon: 'success',
          title: 'Success',
          text: answer.data.message,
        });
        // alert(answer.data.message);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
    <div> <div className="m-3 p-2">
    <h6>Task Name</h6>
    <input
      name="taskName"
      id="taskName"
      type="text"
      placeholder="Enter Task Name"
    ></input>
  </div>
  <div className="m-3 p-2">
    <h6>Task Details</h6>
    <input
      name="taskDetails"
      id="taskDetails"
      type="text"
      placeholder="Enter Task Details"
    ></input>
  </div>
  <div className="m-3 p-2">
        <h6>Assigned To</h6>
        <div>
          {members.map(member => (
            <label key={member.id} className={styles.dropdownItem}>
<div className='row'>
                <div className='col-md-10'>
              {member.name}
              </div>
              <div className='col-md-2'>
              <input
               type="checkbox"
               id={member.id}
               value={member.id}
               checked={assignees.includes(member.id)}
               onChange={handleCheckboxChange}
               style={{ marginRight: "8px" }}
              />
              </div>
              </div>
            </label>
          ))}
        </div>
        <div>
          {nonMembers.map(member => (
            <label key={member.id} className={styles.dropdownItem}>
            <div className='row'>
                            <div className='col-md-10'>
                          {member.name}
                          </div>
                          <div className='col-md-2'>
                          <input
                           type="checkbox"
                           id={member.id}
                           value={member.id}
                           checked={assignees.includes(member.id)}
                           onChange={handleCheckboxChange}
                           style={{ marginRight: "8px" }}
                          />
                          </div>
                          </div>
            </label>
          ))}
        </div>
  </div>
  <div className="m-3 p-2">
    <h6>Deadline</h6>
    <input
      name="deadline"
      id="deadline"
      type="date"
      placeholder="Enter Date"
    ></input>
  </div>
  <div className="m-3 p-2">
    <h6>Days Needed</h6>
    <input
      name="daysNeeded"
      id="daysNeeded"
      type="number"
      placeholder="Enter Days needed"
    ></input>
  </div>
  </div>
  <button type="submit" className="btn btn-secondary">
            Submit
          </button>
   </form>
  )
}
