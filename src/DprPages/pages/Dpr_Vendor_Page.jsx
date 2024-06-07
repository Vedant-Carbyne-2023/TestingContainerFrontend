import React, { useState } from 'react';
import AddVendorPage from './Vendor/VendorForm';
import ShowVendorPage from './Vendor/ShowVendor';
import AllocateVendorPage from './AdminPage';
import AllocateWork from '../pages/WorkAllocation/AllocateWork';
import DprDprVendorForm from './Vendor/VendorForm';


export default function Dpr_Vendor_Page() {
    const [activePage, setActivePage] = useState(null);

    const showAddVendorPage = () => {
        setActivePage('addVendor');
    };

    const showShowVendorPage = () => {
        setActivePage('showVendor');
    };

    const showAllocateVendorPage = () => {
        setActivePage('allocateVendor');
    };
    const showAllocateWorkPage = () => {
        setActivePage('allocateWork');
    };
    const showVendorFormPage = () => {
        setActivePage('vendorForm');
    };
    

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-around', margin: '20px' }}>
                {/* <button style={buttonStyle} onClick={showAddVendorPage}>Add Vendor</button> */}
                <button className="mr-2" style={buttonStyle} onClick={showVendorFormPage}>Vendor Form</button>
                <button className="mr-2" style={buttonStyle} onClick={showShowVendorPage}>Show Vendor</button>
                <button className="mr-2" style={buttonStyle} onClick={showAllocateVendorPage}>Allocate Vendor</button>
                <button className="mr-2" style={buttonStyle} onClick={showAllocateWorkPage}>Allocate Work To User</button>
            </div>

            {/* {activePage === 'addVendor' && <AddVendorPage />} */}
            {activePage === 'showVendor' && <ShowVendorPage />}
            {activePage === 'allocateVendor' && <AllocateVendorPage />}
            {activePage === 'allocateWork' && <AllocateWork />}
            {activePage === 'vendorForm' && <DprDprVendorForm />}
        </div>
    );
}

const buttonStyle = {
    border: '2px solid #3498db', 
    borderRadius: '5px', 
    backgroundColor: '#3498db', 
    color: '#ffffff', 
    padding: '10px 20px', 
    cursor: 'pointer', 
};
