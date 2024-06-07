import React, { useEffect, useState } from "react";

const VendorWise = ({project}) => {
    console.log('project: ', project);
    console.log('vendors assigned: ', project.vendorAssignedTo);
    return ( 
        <>
        <div className="row no-gutters">
            <div>Here our Stock Report will be shown Vendor-wise</div>
        </div>
        </>
     );
}
 
export default VendorWise;