import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetAllMembersInDatabase from "../../../CommonUtitlites/customHooks/useGetAllMembersInDatabase";
import {userId, role, userName} from '../../../CommonUtitlites/Others/commonExportVariable'
import styles from '../Projects/AddMemberInProject/CheckboxDropdown.module.css'

export default function AddMemberForm({ id, assigedMember, setStatus }) {
  let members = useGetAllMembersInDatabase();
 
 const [submit, setSubmit] = useState(false)

  const [selectedMembers, setSelectedMembers] = useState(
    assigedMember ? assigedMember : []
  );

  const handleMemberSelection = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedMembers((prevSelectedMembers) => [
        ...prevSelectedMembers,
        value,
      ]);
    } else {
      setSelectedMembers((prevSelectedMembers) =>
        prevSelectedMembers.filter((memberId) => memberId !== value)
      );
    }
  };

  const handleAddMembers = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const project = formData.get("project");

    let result = api.patch("/add-members", {
      newAssigned: selectedMembers,
      userId,
      role,
      userName,
      id,
    });
    result = await errorHandler(result);
    alert(result.data.message);


    setStatus(!submit)
    setSubmit(!submit)

    
  };

  return (
    <div>
      <form onSubmit={handleAddMembers}>
        {" "}
        <div className="m-3 p-2">
          <div>
            {members.map((member) => (
              

<label key={member.id} className={styles.dropdownItem}>
<div className='row'>
                <div className='col-md-5'>
              {member.name}
              </div>
              <div className='col-md-5'>
              {member.role}
              </div>
              <div className='col-md-2'>
              <input
               type="checkbox"
               id={member.id}
               value={member.id}
               checked={selectedMembers.includes(member.id)}
               onChange={handleMemberSelection}
               style={{ marginRight: "8px" }}
              />
              </div>
              </div>



            </label>
            ))}
          </div>
        </div>
        <input name="projectId" id="projectId" type="hidden" value={id} />
        <button
          type="submit"
          className="btn btn-secondary"
          style={{ display: "flex", margin: "0 auto" }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
