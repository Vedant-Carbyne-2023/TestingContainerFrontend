import React, { useState } from 'react';
import GpStatus from './GpStatus';
import SearchingCriteria from './SearchingCriteria/SearchingCriteria';
import SearchingCriteriaCopy from './SearchingCriteria/SearchingCriteria copy';
import ApproveDpr from '../ApproveDpm/ApproveDpr';
import ChangeRequest from './ChangeRequest';
import VendorApprovePage from '../Changes/VendorApprovePage';

export default function Dpr_Gp_Approval_Status() {
  const [component, setComponent] = useState('GpStatus');

  const buttonStyle = {
    backgroundColor: 'black', // Active button color
    color: '#fff', // Active button text color
  };

  return (
    <div className="container-fluid px-5 mt-5">
      <div className="col" style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button
          type="button"
          onClick={() => setComponent('GpStatus')}
          style={component === 'GpStatus' ? buttonStyle : {}}
          className="btn btn-primary mr-3"
        >
          Active Gp
        </button>
        {/* <button
          type="button"
          onClick={() => setComponent('SearchingCriteriaButton')}
          style={component === 'SearchingCriteriaButton' ? buttonStyle : {}}
          className="btn btn-primary"
        >
          Searching Criteria Button Wise
        </button>
        <button
          type="button"
          onClick={() => setComponent('SearchingCriteriaTable')}
          style={component === 'SearchingCriteriaTable' ? buttonStyle : {}}
          className="btn btn-primary"
        >
          Searching Criteria Table Wise
        </button> */}
        <button
          type="button"
          onClick={() => setComponent('ChangeRequests')} 
          style={component === 'ChangeRequests' ? buttonStyle : {}} 
          className="btn btn-primary mr-3"
        >
          Change Requests
        </button>
        <button
          type="button"
          onClick={() => setComponent('ApprovalStatus')}
          style={component === 'ApprovalStatus' ? buttonStyle : {}}
          className="btn btn-primary"
        >
          Approval Status
        </button>
        <button
          type="button"
          onClick={() => setComponent('ApproveVendor')}
          style={component === 'ApproveVendor' ? buttonStyle : {}}
          className="btn btn-primary"
        >
          Approve Vendor
        </button>
      </div>
      {component === 'GpStatus' ? (
        <GpStatus />
      ) : component === 'SearchingCriteriaTable' ? (
        <SearchingCriteriaCopy />
        ) : component === 'SearchingCriteriaButton' ? (
          <SearchingCriteria />
      ) : component === 'ApprovalStatus' ? (
        <ApproveDpr />
      ) : component === 'ChangeRequests' ? ( 
        <ChangeRequest />
      ) : component === 'ApproveVendor' ? ( 
        <VendorApprovePage/>
      ) : null}
    </div>
  );
}
