import React, { useEffect, useState } from 'react';
import { api } from '../../functions/axiosDefault';
import { userName, userId } from '../../../CommonUtitlites/Others/commonExportVariable';
import Swal from 'sweetalert2';
export default function VendorApprovePage() {
    const [vendors, setVendors] = useState([]);
    const [status, setStatus] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.post('/not-approve-vendors', {
                    // Include any required data in the request body
                });
                console.log("DATA",response.data)
                setVendors(response.data.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchData();
    }, [status]);

    const handleApproveClick = async (vendorId) => {
        try {
            const response = await api.post('/approve-dpr-vendor', { vendorId, userId, userName });
            Swal.fire({
                title:"Vendor Approved Successfully",
                timer:5000,
                icon:'success'
            })
            setStatus(!status)
            // Handle the response as needed
            console.log('Vendor Approved:', response.data);
        } catch (error) {
            console.error('Error approving vendor:', error);
        }
    };

    return (
        <div>
          <h2>Vendor Approval Page</h2>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#007bff', color: 'white' }}>S.No</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#007bff', color: 'white' }}>Vendor Name</th>
                <th style={{ border: '1px solid black', padding: '8px', backgroundColor: '#007bff', color: 'white' }}>Approve</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor, index) => (
                <tr key={vendor._id}>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{index + 1}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>{vendor.vendorName}</td>
                  <td style={{ border: '1px solid black', padding: '8px' }}>
                    <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px' }} onClick={() => handleApproveClick(vendor._id)}>
                      Approve
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }