import React, { useEffect, useState } from "react";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { userId, role, userName } from "../../../../CommonUtitlites/Others/commonExportVariable";
import useGetAllMembersInDatabase from "../../../../CommonUtitlites/customHooks/useGetAllMembersInDatabase";

export default function AddMemberForm({id}) {
  let members = useGetAllMembersInDatabase();

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
  };

  return (
    <div>
      <form onSubmit={handleAddMembers}>
        {" "}
        <div className="m-3 p-2">

          <h6>Select Members To Assigning the Project </h6>
          <div>

            {members.map((member) => (
              <div
                key={member.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "14rem" }}>
                  <label htmlFor={member.id}>{member.name}</label>
                </div>
                <input
                  type="checkbox"
                  id={member.id}
                  value={member.id}
                  checked={selectedMembers.includes(member.id)}
                  onChange={handleMemberSelection}
                  style={{ marginRight: "8px" }}
                />
              </div>
            ))}
          </div>
        </div>
        <input name="projectId" id="projectId" type="hidden" value={id} />
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>
    </div>
  );
}
