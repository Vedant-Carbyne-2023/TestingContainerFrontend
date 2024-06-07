import React, { useEffect, useRef, useState } from "react";

import useGetAllProjectsForAdmin from "../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import BoqForm from "./BoqForm";

export default function BOM() {
  

  const [selectedProject, setSelectedProject] = useState("");

const [showDropdown2, setShowDropdown2] = useState(false);


  return (
    <>
    <div className="container-fluid">

  <BoqForm selectedProject={selectedProject} />
  
  
    </div>
        
      
    </>
  );
}
