import React, {useState, useEffect,useRef} from 'react';
// import styles from './showProducts.module.css';
import { role, userId, userName} from "../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import EditProduct from "./EditProduct";
import Swal from 'sweetalert2';
import styles from '../TableModule/TableSticky.module.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const ShowTable = ({ data, setStatus }) => {
    // console.log('data came: ',data)
    // function to delete Product
    const [modalOpen, setModalOpen] = useState(false);
    const [item, setItem] = useState({});
    const tableRef = useRef(null);
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
      tempdata.userName = userName;
      let result = await api.post('/delete-product', tempdata);
      result = await errorHandler(result);
      // console.log(result);
      if(result&&result.data){
        // console.log('here',result.data.data._id);
        setStatus(result.data.data._id);
      }
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

    const exportToExcel = () => {
      const table = tableRef.current;
      const rows = table.getElementsByTagName('tr');
      const header = [];
      const data = [];
  
      // Extract headers
      for (let i = 0; i < rows[0].cells.length; i++) {
        header.push(rows[0].cells[i].innerText);
      }
  
      // Extract data
      for (let i = 1; i < rows.length; i++) {
        const rowData = [];
        for (let j = 0; j < rows[i].cells.length; j++) {
          rowData.push(rows[i].cells[j].innerText);
        }
        data.push(rowData);
      }
  
      // Create Excel file
      const csvContent =
        'data:text/csv;charset=utf-8,' +
        header.join(',') +
        '\n' +
        data.map((row) => row.join(',')).join('\n');
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', 'table_data.csv');
      document.body.appendChild(link);
      link.click();
    };
  return (
    <div className={`${styles.tableContainer} container-fluid d-flex mt-2`}>
    <div className={`${styles.tableWrapper} col`}>
    <button onClick={exportToExcel}>Download Excel</button>
        <table ref={tableRef} className={`${styles.table} table`}>
          {/* Table Headers */}
        <thead className={`${styles.stickyHeader} sticky`}>
          <tr>
          <th style={cellStyle}>S.No.</th>
          <th style={cellStyle}>Product ID</th>
          <th style={cellStyle}>Category</th>
          <th style={cellStyle}>Subcategory</th>
          <th style={cellStyle}>Material Description</th>
          <th style={cellStyle}>HSN Code</th>
          <th style={cellStyle}>Edit</th>
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
            <td style={cellStyle}>{item._id}</td>
            <td style={cellStyle}>{item.category.name}</td>
            <td style={cellStyle}>{item.subcategory.name}</td>
            <td style={cellStyle}>{item.name}</td>
            <td style={cellStyle}>{item.hsnCode}</td>
            <td id={item._id} style={cellStyle} onClick={()=>handleEdit(item)}>
            <i class="fa-solid fa-pen-to-square"></i>
            </td>
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

export default ShowTable;
