import React, { useEffect, useRef, useState } from "react";
import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import BoqForm from "./BoqForm";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserBOM({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([])

  const [selectedProject, setSelectedProject] = useState("");
console.log(permission)

useEffect(() => {
  const permissionObject = permission.map(item => ({
    [item.permission]: item.value
  }));
 setPermissions(permissionObject)
}, [permission])


  return (
    <>
   
    

    <div className="container-fluid">

  <BoqForm selectedProject={selectedProject} permissions={permissions}/>
  
  
    </div>
        
      
    </>
  );
}
