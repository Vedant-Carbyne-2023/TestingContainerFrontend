import React, { useState, useEffect } from 'react';
import Calculator from './Calculator';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from 'sweetalert2';
import {errorHandler} from '../../CommonUtitlites/Others/errorHandle'
import { formatDate } from '../../CommonUtitlites/Others/formattingDateAndName';
import CustomModal from '../../CommonUtitlites/ModalPopUp/CustomModal';
import ShowJmr from './ShowJmr';

export default function JmrTable() {
  const [jmrs, setJmrs] = useState([]);
  const [jmr, setJmr] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post("/get-all-jmr", { userId, role, userName })
        response= await errorHandler(response)
        console.log('wh have', response);
        if(response.data && response.data.data) setJmrs(response.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    fetchData();
  }, []);

  const handleOpenModal = async (indent)=>{
    // setLoading(true);
    setJmr(indent)
    console.log('clicked', indent);
    setIsModalOpen(true);
    // setLoading(false);
  }

  const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '100%',
  };
  const cellStyle = {
    border: '1px solid black',
  
    padding: '8px',
    textAlign: 'center',
  };
  return (
    <div className="container p-0 mt-3">
      <div className="table-responsive">
        <table className="table" style={tableStyle}>
          <thead className="sticky-thead">
            <tr>
              <th style={cellStyle}>JMR Id</th>
              <th style={cellStyle}>Vendor Name</th>
              <th style={cellStyle}>GP Name</th>
              <th style={cellStyle}>Date</th>
              {/* <th>Description</th> */}
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
          {(jmrs)?.map((indent, key) => (
      <tr key={key}>
        <td style={cellStyle}>
        {" "}
                  <button
                    className="btn btn-link text-left"
                    onClick={() => handleOpenModal(indent)}
                  >
                    {" "}
                    {indent.jmrId}{" "}
                  </button>
          </td>
        <td style={cellStyle}>{indent.vendorName}</td>
        <td style={cellStyle}>{indent.gpName}</td>
        <td style={cellStyle}>{formatDate(new Date(indent.todaysDate))}</td>
        {/* <td>
          <button
            className="btn btn-link text-left"
            onClick={() => handleModalOpen(indent)}
          >
            More Description
          </button>
        </td> */}
      </tr>
    ))}
  </tbody>
        </table>
      </div>
      <CustomModal
        size={"large"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={"JMR Info"}
      >
        <ShowJmr formData={jmr}/>
      </CustomModal>
    </div>
  )
}
