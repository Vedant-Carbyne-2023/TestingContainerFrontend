import React, { useEffect, useState } from "react";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {userId, role, userName } from '../../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import useGetUserProject from "../../../CommonUtitlites/customHooks/useGetUserProject";
import Inward from "./Inward";
import Outward from "./Outward";
import Loader from "./Loader";
import { format } from "date-fns";

const GpWise = ({ vendorName }) => {
  const [products, setProducts] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [projectId, setProjectId] = useState("");
  const [gpName, setGpName] = useState("");
  const [gps, setGps] = useState([]);
  const [loading, setLoading] = useState(false);

  let projects = useGetUserProject();

  const handleProjectChange = async (e) => {
    const selectedProjectId = e.target.value;
    setProjectId(selectedProjectId);
    if (!selectedProjectId) {
      alert("Please Select Project ");
      return;
    }
    setLoading(true);
    let getGps = api.post("/get-gps-projectWise", { userId, role, userName, projectId: selectedProjectId });
    getGps = await errorHandler(getGps);
    setGps(getGps.data.data);
    setLoading(false);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      let result = api.post('/stock-report-vendorGpWise', { userId, role, userName, vendorName, projectId });
      result = await errorHandler(result);
      if (result.data.data.length > 0) {
        const firstArray = result.data.data[0];
        setProducts(firstArray);
      }
      setLoading(false);
    }
    if (projectId) {
      fetchData();
    }
  }, [projectId]);

  const cellStyle = {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
  };

  const groupAndSumProducts = (products) => {
    const groupedProducts = {};
    products.forEach((product) => {
      const key = `${product.gp}-${product.materialCategory}-${product.materialSubCategory}-${product.materialDescription}`;
      if (!groupedProducts[key]) {
        groupedProducts[key] = { ...product, quantityIssued: 0 };
      }
      groupedProducts[key].quantityIssued += product.issuedQuantity;
    });
    return Object.values(groupedProducts);
  };

  const groupedProducts = groupAndSumProducts(products);

  const [modalOpen1, setModalOpen1] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [itemSelected, setItemSelected] = useState("");

  const handleOpenModal = (item, field) => {
    if (!projectId) {
      alert("No Project Id Please Select Project First");
      return '';
    }
    setItemSelected(item);
    if (field === 'MIN') {
      setModalOpen1(true);
    }
    if (field === 'MRN') {
      setModalOpen2(true);
    }
  };

  const [gpWiseData, setGpWiseData] = useState([])

  const handleOpenModal3 = (item)=>{
  let data =  products.filter(data => data.gp ==item.gp && data.materialCategory == item.materialCategory
      && data.materialSubCategory == item.materialSubCategory && data.materialDescription == item.materialDescription)
      setGpWiseData(data)
    setModalOpen3(true)
  }

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <div className="container-fluid">
            <div className="mb-3">
              <label htmlFor="projectSelect" className="form-label">
                Select Project
              </label>
              <select
                className="form-control"
                id="projectSelect"
                onChange={handleProjectChange}
                value={projectId} // Bind the selected project's ID
              >
                <option value="">Select a Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {loading ? <div>Loading</div> : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" style={cellStyle}>S.No.</th>
                  <th scope="col" style={cellStyle}>GP Name</th>
                  <th scope="col" style={cellStyle}>Material Name</th>
                  <th scope="col" style={cellStyle}>Quantity Issued</th>
                </tr>
              </thead>
              <tbody>
                {groupedProducts && groupedProducts.map((item, index) => (
                  <tr key={index}>
                    <td scope="col" style={cellStyle}>{index + 1}</td>
                    <td scope="col" style={cellStyle}>{item.gp}</td>
                    <td scope="col" style={cellStyle}>{`${item.materialCategory}/${item.materialSubCategory}/${item.materialDescription}`}</td>
                    <td scope="col" style={cellStyle}><button className="btn btn-primary" onClick={()=>handleOpenModal3(item)}>{item.quantityIssued}</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <CustomModal
            isOpen={modalOpen2}
            onClose={() => setModalOpen2(false)}
            size={"xl"}
            title={"Stock Report Inward"}
          >
            <Inward projectId={projectId} itemSelected={itemSelected} vendorName={vendorName} gpName={gpName} />
          </CustomModal>
          <CustomModal
            isOpen={modalOpen1}
            onClose={() => setModalOpen1(false)}
            size={"xl"}
            title={"Stock Report Outward"}
          >
            <Outward projectId={projectId} itemSelected={itemSelected} vendorName={vendorName} gpName={gpName} />
          </CustomModal>
          <CustomModal
            isOpen={modalOpen3}
            onClose={() => setModalOpen3(false)}
            size={"xl"}
            title={"Stock Report Outward"}
          >
            <div>
    <h4>Stock Report Outward</h4>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">GP Name</th>
          <th scope="col">Date</th>
          <th scope="col">MIN No</th>
          <th scope="col">Product Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Indent ID</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over your data to generate table rows */}
        {/* Assuming you have an array named outwardData */}
        {gpWiseData && gpWiseData.map((item, index) => (
          <tr key={index}>
            <td>{item.gp}</td>
            <td>{format(new Date(item.createdAt), 'dd-MM-yyyy')}</td>
            <td>{item.minId}</td>
            <td>{item.materialCategory}/{item.materialSubCategory}/{item.materialDescription}</td>
            <td>{item.issuedQuantity}</td>
            <td>{item.indentId}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
          </CustomModal>
        </>
      )}
    </>
  );
}

 
export default GpWise;