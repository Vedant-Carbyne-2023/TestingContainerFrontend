import React, {useState, useEffect} from 'react';
import styles from './showProducts.module.css';
import { role, userId} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import CustomModal from '../../CommonUtitlites/ModalPopUp/CustomModal';
import EditProduct from './EditProduct';
import Swal from 'sweetalert2';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardImage,
} from 'mdb-react-ui-kit';

const ShowTable = ({ data, permission, setStatus }) => {
  
    console.log(data)
    const [modalOpen, setModalOpen] = useState(false);
    const [item, setItem] = useState({});
    // function to delete Product
    const handleDelete = async (id) => {
      // Ask for confirmation
      const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
      if (!confirmDelete) {
        // If the user cancels the deletion, do nothing
        return;
      }
    
      let tempdata = {};
      tempdata.productId = id;
      tempdata.userId = userId;
      tempdata.role = role;
      let result = await api.post('/delete-product', tempdata);
      result = await errorHandler(result);
      if(result&&result.data){
        console.log('here',result.data.data._id);
        setStatus(result.data.data._id);
      }
      console.log(result);
      Swal.fire(result.data.message);
      // alert(result.data.message);
    
      console.log(" Deleted product", tempdata);
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
    <table className="table table-bordered table-hover" style={tableStyle}>
  <thead style={{backgroundColor:"#cedfe5"}} className=" sticky-thead">
    <tr>
      <th style={cellStyle}>S.No.</th>
      <th style={cellStyle}>HSN Code</th>
      <th style={cellStyle}>Category</th>
      <th style={cellStyle}>Subcategory</th>
      <th style={cellStyle}>Material Description</th>
      <th style={cellStyle}>Edit</th>
      {permission && <th style={cellStyle}>Delete</th>}
    </tr>
  </thead>
  <tbody>
    {data.map((item, index) => (
      <tr key={item._id} style={{ cursor: "pointer" }}>
        <td style={cellStyle}>{index + 1}</td>
        <td style={cellStyle}>{item.hsnCode}</td>
        <td style={cellStyle}>{item.category.name}</td>
        <td style={cellStyle}>{item.subcategory.name}</td>
        <td style={cellStyle}>{item.name}</td>
        <td
          id={item._id}
          style={cellStyle}
          onClick={() => handleEdit(item)}
        >
          <i className="fas fa-pen"></i>
        </td>
        {permission && (
          <td
            id={item._id}
            style={cellStyle}
            onClick={() => handleDelete(item._id)}
          >
            <i className="fas fa-trash-alt delete-icon"></i>
          </td>
        )}
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

export default ShowTable;
