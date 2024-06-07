import React, { useEffect, useState } from "react";
import { api } from "../../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role } from "../../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../../CommonUtitlites/Others/errorHandle";
import Loader from "../../../../../CommonUtitlites/Loader/Loader";
import CustomModal from "../../../../../CommonUtitlites/ModalPopUp/CustomModal";
import Outward from "./Outward";
import Papa from 'papaparse';

function exportToCSV(data) {
  const csvData = [];

  // Add header row
  csvData.push(['S. No.', 'Material Description', 'UOM',  'Quantity Outward', ]);

  // Add data rows
  data.forEach((item,index) => {
    csvData.push([
      index+1,
      item.materialCategory + '/' +item.materialSubCategory +'/'+ item.materialDescription ,
      item.uom,
      item.issuedQuantity,
    ]);
  });
  const csv = Papa.unparse(csvData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute('download', 'data.csv');
  link.click();
  URL.revokeObjectURL(url);
}


const GpWise = ({project}) => {

  
  const [products, setProducts] = useState([]);

  const handleDownload = () => {
    if(products){
      exportToCSV(products);
    }
  };

    // console.log('project: ', project);
    // console.log('projectName: ', project.name, project.id);
    const [loading, setLoading] = useState(false)

    const [gp, setGp] = useState({id:"",name:""})

    const [gps, setGps] = useState([])
    useEffect(() => {
        
          const getRelatedGps = async()=>{
            let getGps = api.post("/get-gps-projectWise",{userId, role, projectId:project.id})
            getGps = await errorHandler(getGps)
            setGps(getGps.data.data)
        }
        if (project && gp.id) {
          async function fetchData() {
            setLoading(true);
            try {
              const result = await api.post('/stock-report-gpWise&AllItems', {
                userId,
                role,
                projectId: project.id,
                gpName:gp.name
              });
    
              const processedResult = await errorHandler(result);
              console.log(processedResult.data);
              setProducts(processedResult.data.data);
              setLoading(false);
            } catch (error) {
              console.error(error);
              setLoading(false);
            }
          }
    
          if(gp.name)
          {
              fetchData();
          }


        
          
        
        }

        getRelatedGps()

      }, [project,gp]);

const handleGP = async(id)=>{
  console.log(id)
let gp2 = gps.find(gp => gp._id === id)
console.log(gp2, "herer")
setGp({id:gp2._id, name :gp2.name})
}
  
      

    const [modalOpen1, setModalOpen1] = useState(false)
    const [modalOpen2, setModalOpen2] = useState(false)
    const [itemSelected, setItemSelected] = useState("")
    const handleOpenModal = (item, field) => {
      if(!project  && !gp.id){
        alert("No Project Or GP. Please Select It")
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
            <select
            className="form-control"
            value={gp.id}
            onChange={(e)=>handleGP(e.target.value)}
            >
                <option>Select Gp For Stock Report</option>
                {
                gps &&    gps.map(gpName =>
                        <option value={gpName._id}>{gpName.name}</option>
                        )
                }

            </select>
         <div className="d-flex" style={{justifyContent:"center", alignItems:"center"}}> <button disabled={!gp.name} className="btn" onClick={()=>handleDownload(products)}>Download CSV</button></div>
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
                    <th scope="col" style={cellStyle}>Quantity Outward</th>
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
                         
                         <th scope="col" style={cellStyle}><button className="btn" type="button"
                         onClick={()=>handleOpenModal(item,"MIN")}
                         >{item.issuedQuantity}</button></th>
                           </tr>
                        ))}
                     </tbody>
                     </table>
            </div>
            </div>
        </>
        )}

                    <CustomModal
                    isOpen={modalOpen1}
                    onClose={()=>setModalOpen1(false)}
                    size={"xl"}
                    title={"Stock Report Outward"}
                    >
                        <Outward projectId={project.id} gpName={gp.name} itemSelected={itemSelected}/>

                    </CustomModal>
        </>
     );
}
 
export default GpWise;