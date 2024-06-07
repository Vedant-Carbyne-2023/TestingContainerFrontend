import React, { useEffect, useState } from "react";

const ContractorWise = ({project}) => {
    console.log('project: ', project);
    console.log('contractors assigned: ', project.contractorAssignedTo);
    return ( 
        <>
        <div className="row no-gutters">
            <div>Here our Stock Report will be shown Contractor-wise</div>
        </div>
        </>
     );
}
 
export default ContractorWise;