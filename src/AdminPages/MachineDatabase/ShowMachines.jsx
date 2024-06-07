import React, {useState, useEffect} from 'react';
import styles from './showProducts.module.css';
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import EditProduct from "./EditProduct";
import Swal from 'sweetalert2';

const ShowMachines = ({ data, setStatus }) => {
    // console.log('data came: ',data)
    // function to delete Product
    const [modalOpen, setModalOpen] = useState(false);
    const [item, setItem] = useState({});
    const handleDelete = async (id) => {
      // Ask for confirmation
      const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
      if (!confirmDelete) {
        // If the user cancels the deletion, do nothing
        return;
      }
    
      let tempdata = {};
      tempdata.machineId = id;
      tempdata.userId = userId;
      tempdata.role = role;
      tempdata.userName = userName;
      let result = await api.post('/delete-single-machineDatabase', tempdata);
      result = await errorHandler(result);
      // console.log(result);
      setStatus(result.data.message)
          // alert(result.data.message);
      Swal.fire(result.data.message);
    
      // console.log(" Deleted product", tempdata);
    }
    const handleEdit = async (item) => {
      setItem(item);
      console.log('we have', item);
      setModalOpen(true);
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
    <div className="container-fluid mt-3" style={{ overflow: "auto" }}>
      <div className={styles.tableWrapper}>
    <table className="table" style={tableStyle}>
      <thead className="sticky-thead">
        <tr>
          <th style={cellStyle}>S.No.</th>
          <th style={cellStyle}>Machine Code</th>
          <th style={cellStyle}>Machine Name</th>
          <th style={cellStyle}>Category</th>
       
          {
            role==='SuperUser' &&
          <th style={cellStyle}>Delete</th>
          }
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item._id} style={{cursor:"initial"}}>
            <td style={cellStyle}>{index + 1}</td>
            <td style={cellStyle}>{item.machineCode}</td>
            <td style={cellStyle}>{item.name}</td>
            <td style={cellStyle}>{item.categoryName?item.categoryName:""}</td>
            {
            role==='SuperUser' &&
            // <td><button className="btn" onClick={()=>handleDelete(item._id)}>Delete</button></td>
            <td id={item._id} style={cellStyle} onClick={()=>handleDelete(item._id)}>
                <i className="fas fa-trash-alt delete-icon"></i>
            </td>
          }
          </tr>
        ))}
      </tbody>
    </table>
    </div>
    <CustomModal
              title={"Edit Product"}
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
            >
              <EditProduct item={item} />
            </CustomModal>
    </div>
  );
};

export default ShowMachines;
