import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import { parseISO } from "date-fns";
import CustomModal from "../../../CommonUtitlites/ModalPopUp/CustomModal";
import MainTableModal from "./TableComponent/MainTableModal";
const InputForm = ({ setData, setTableData, setBoqData }) => {

  const [allRelatedJmr, setAllRelatedJmr] = useState([])
  const [formData, setFormData] = useState({
    contractorSupplier: "",
    nameOfWork: "",
    purposeOfSupply: "",
    serialNoOfBill: "",
    dateOfThisBill: "",
    lastBillDate: "",
    lastBillSerialNo: "",
    agencyCbNo: "",
    district: "",
    block: "",
    gp: "",
    schemeNo: "",
  });

  const handleFetchSchemeNo = async () => {
    let result = api.post('get-jmr-supply', {schemeNo:formData.schemeNo})
    result = await errorHandler(result)
 console.log(result.data.data.tableData)
 console.log("here1")
 await setTableData(result.data.data.tableData)
 await setBoqData(result.data.boqDetails)
 console.log(result)
 await setAllRelatedJmr(result.data.alljmr.jmrRelated)
 console.log("here2")
 const dateOfThisBill = result.data.data.dateOfThisBill;

 const formattedDate = dateOfThisBill
 ? new Date(dateOfThisBill) instanceof Date && !isNaN(new Date(dateOfThisBill).valueOf())
   ? new Date(dateOfThisBill).toISOString().split('T')[0]
   : null
 : null;

    setFormData({...formData,
      gp:result.data.data.gp,
      block:result.data.data.block,
      district:result.data.data.district,
      agencyCbNo:result.data.data.agencyCbNo,
      contractorSupplier:result.data.data.contractorSupplier,
      lastBillDate: formattedDate,
      lastBillSerialNo:result.data.data.serialNoOfBill,
    })
    console.log(result)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (formData) {
      setData(formData);
    }
  }, [formData]);

  const [modal, setModal] = useState(false)

  const [jmrSelected, setJmrSelected] = useState('')

  const handleModalJmr = async(data)=>{
setJmrSelected('')
setJmrSelected(data)
setModal(true)
    

  }

  return (
    <div className="container mt-5">
      <h6 className="text-decoration-underline">JMR Supply Form</h6>

      <div className="row">

      <div className="col-md-12 mb-3" style={{ position: "relative" }}>
          <label htmlFor="schemeNo">Scheme No</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="schemeNo"
              name="schemeNo"
              placeholder="Enter scheme no"
              value={formData.schemeNo}
              onChange={handleChange}
              required
            />
            <div className="input-group-append" onClick={handleFetchSchemeNo}>
              <span className="input-group-text">
                <i className="fas fa-search"></i>
              </span>
            </div>
          </div>
        </div>
    <div className="col-12">
      <p>Supply Jmrs Related To Scheme No </p>
        {
          allRelatedJmr &&
          allRelatedJmr.length>0  &&
          allRelatedJmr.map(jmr =>
            
            <button className="btn" onClick={()=>handleModalJmr(jmr)}>{jmr.serialNoOfBill}</button>
            )
        }
</div>
        <div className="col-md-4 mb-3">
          <label htmlFor="district">District</label>
          <input
            type="text"
            className="form-control"
            id="district"
            disabled={true}
            name="district"
            placeholder="Enter district"
            value={formData.district}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="block">Block</label>
          <input
            type="text"
            className="form-control"
            id="block"
            disabled={true}
            name="block"
            placeholder="Enter block"
            value={formData.block}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-4 mb-3">
          <label htmlFor="gp">GP</label>
          <input
            type="text"
            className="form-control"
            id="gp"
            disabled={true}
            name="gp"
            placeholder="Enter GP"
            value={formData.gp}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="col-md-6 mb-3" style={{ position: "relative" }}>
          <label htmlFor="lastBillSerialNo">Last Bill No</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              id="lastBillSerialNo"
              name="lastBillSerialNo"
              disabled
              placeholder="Enter last bill no"
              value={formData.lastBillSerialNo}
              onChange={handleChange}
              required
            />
            <div className="input-group-append">
              <button className="btn btn-outline-secondary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="lastBillDate"> Date of Last Bill </label>
          <input
            type="date"
            className="form-control"
            id="lastBillDate"
            disabled
            name="lastBillDate"
            placeholder="Enter date of last bill"
            value={formData.lastBillDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="contractorSupplier">Contractor/Supplier</label>
          <input
            type="text"
            className="form-control"
            id="contractorSupplier"
            name="contractorSupplier"
            placeholder="Enter contractor/supplier"
            value={formData.contractorSupplier}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="nameOfWork">Name Of Work</label>
          <input
            type="text"
            className="form-control"
            id="nameOfWork"
            name="nameOfWork"
            placeholder="Enter name or work"
            value={formData.nameOfWork}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-12 mb-3">
          <label htmlFor="purposeOfSupply">Purpose of Supply</label>
          <input
            type="text"
            className="form-control"
            id="purposeOfSupply"
            name="purposeOfSupply"
            placeholder="Enter purpose of supply"
            value={formData.purposeOfSupply}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="serialNoOfBill">Serial No of Bill</label>
          <input
            type="text"
            className="form-control"
            id="serialNoOfBill"
            name="serialNoOfBill"
            placeholder="Enter serial no of bill"
            value={formData.serialNoOfBill}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <label htmlFor="dateOfThisBill">Date of This Bill</label>
          <input
            type="date"
            className="form-control"
            id="dateOfThisBill"
            name="dateOfThisBill"
            value={formData.dateOfThisBill}
            onChange={handleChange}
            required
          />
        </div>

   
   
      
      </div>
      <CustomModal
          isOpen={modal}
          onClose={() => setModal(false)}
          title={"Jmr Supply"}
        >
          <MainTableModal data={jmrSelected} boqDetails={jmrSelected.tableData}/>
        </CustomModal>
    </div>
  );
};

export default InputForm;
