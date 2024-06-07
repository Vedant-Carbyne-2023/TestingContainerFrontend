import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import Inward from "./Inward";
import Outward from "./Outward";
import Papa from 'papaparse';
import exportToCSV from "../../../../../CommonUtitlites/Others/exportToCSV";

function handleExcel(data) {
    function formatItemToRow(item, index) {
      return [
        index + 1,
        `${item.materialCategory}/${item.materialSubCategory}/${item.materialDescription}`,
        item.uom,
        item.rate,
        item.mrnQuantity,
        item.rate*item.mrnQuantity,
        item.issuedQuantity,
        item.rate*item.issuedQuantity,
        item.mrnQuantity - item.issuedQuantity,
        item.rate*(item.mrnQuantity-item.issuedQuantity),
      ];
    }
    let headers = ['S.No.','Material Description','UOM','Average Rate','Quantity Inward','Amount','Quantity Outward','Amount','Stock On Date','Amount']
      exportToCSV(data,headers,formatItemToRow)
  
}


const ProjectWise = ({project}) => {

  
  const [products, setProducts] = useState([]);

  const handleDownload = () => {
    if(products){
      exportToCSV(products);
    }
  };

    console.log('project: ', project);
    console.log('projectName: ', project.name, project.id);
    const [loading, setLoading] = useState(false)
  
    const fetchData = async()=>{
      if(project)
        {setLoading(true);
        try {
          const result = await api.post('/stock-report-projectWise&AllItems', {
            userId,
            role,
            projectId: project.id,
          });

          const processedResult = await errorHandler(result);
          console.log(processedResult.data);
          setProducts(processedResult.data.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }}
    

    }

    const [modalOpen1, setModalOpen1] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [itemSelected, setItemSelected] = useState("")
    const handleOpenModal = (item, field) => {
      if(!project){
        alert("No Project Id Please Select Project First")
        return '';
      }
      setItemSelected(item)
      if(field=='MIN'){
      setModalOpen1(true)}
      if(field=='MRN')
      {setModalOpen2(true)}
    };

      const cellStyle = {
        border: '1px solid black',
      
        padding: '8px',
        textAlign: 'center',
      };
    return ( 
        <>
        {loading?<Loader/>:(
<>
         <div className="d-flex" style={{justifyContent:"center", alignItems:"center"}}> <button className="btn" onClick={()=>fetchData()}>Click To Fetch Data</button></div>
         <div className="d-flex" style={{justifyContent:"center", alignItems:"center"}}> <button className="btn" disabled={!products.length>0} onClick={()=>handleExcel(products)}>Download CSV</button></div>
         <div className="row no-gutters">
            <div className="col">
             <table className="table">
                <thead>
                  <tr>
                    <th scope="col" style={cellStyle}>S. No.</th>
                    {/* <th scope="col" style={cellStyle}>MRN No.</th> */}
                    <th scope="col" style={cellStyle}>
                      Material Description</th>
                      <th scope="col" style={cellStyle}>UOM</th>
                        <th scope="col" style={cellStyle}>Average Material Rate</th>
                        <th scope="col" style={cellStyle}>Quantity Inward</th>
                        <th scope="col" style={cellStyle}>Inward Amount</th>
                        <th scope="col" style={cellStyle}>Quantity Outward</th>
                        <th scope="col" style={cellStyle}>Outward Amount</th>
                        <th scope="col" style={cellStyle}>Stock (As On Date)</th>
                        <th scope="col" style={cellStyle}>Stock Amount</th>
                    {/* <th scope="col" style={cellStyle}>GP</th> */}
                    {/* <th scope="col" style={cellStyle}>Vendor Name</th> */}
                  </tr>
                </thead>
                     <tbody>
                       {
                       products &&
                       products.map((item, index) => (
                           <tr key={item._id}>
                         <td scope="col" style={cellStyle}>{index+1}</td>
                         {/* <th scope="col" style={cellStyle}>{item.mrnsId}</th> */}
                         <td scope="col" style={{textAlign:"left", border: '1px solid black',padding: '8px'}}> 
                         
                         {item.materialCategory + '/' +item.materialSubCategory +'/'+ item.materialDescription }
                          </td>
                          <td scope="col" style={cellStyle}>{item.uom}</td>
          <th scope="col" style={cellStyle}>
              {item.rate}
          </th>
          <th scope="col" style={cellStyle}>
            <button className="btn" type="button" onClick={() => handleOpenModal(item, "MRN")}>
              {item.mrnQuantity}
            </button>
          </th>
          <th scope="col" style={cellStyle}>
              { parseFloat(item.rate*item.mrnQuantity).toFixed(2)}
          </th>
          <th scope="col" style={cellStyle}>
            <button className="btn" type="button" onClick={() => handleOpenModal(item, "MIN")}>
              {item.issuedQuantity}
            </button>
          </th>
          <th scope="col" style={cellStyle}>
          { parseFloat(item.rate*item.issuedQuantity).toFixed(2)}
          </th>
          <th scope="col" style={cellStyle}>
            {item.mrnQuantity - item.issuedQuantity}
          </th>
          <th scope="col" style={cellStyle}>
          { parseFloat(item.rate*(item.mrnQuantity - item.issuedQuantity)).toFixed(2)}
          </th>
        </tr>
                        ))}
                     </tbody>
                     </table>
            </div>
          </div>
        </>
        )}


                    <CustomModal
                    isOpen={modalOpen2}
                    onClose={()=>setModalOpen2(false)}
                    size={"xl"}
                    title={"Stock Report Inward"}
                    >
                        <Inward projectId={project.id} itemSelected={itemSelected}/>

                    </CustomModal>
                    <CustomModal
                    isOpen={modalOpen1}
                    onClose={()=>setModalOpen1(false)}
                    size={"xl"}
                    title={"Stock Report Outward"}
                    >
                        <Outward projectId={project.id} itemSelected={itemSelected}/>

                    </CustomModal>
        </>
     );
}
 
export default ProjectWise;