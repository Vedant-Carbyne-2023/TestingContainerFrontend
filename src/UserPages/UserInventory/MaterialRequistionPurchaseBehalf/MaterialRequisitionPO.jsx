import React, { useState } from 'react';
import MRPOEditableTable from './MRPOEditableTable';
import { currentDate } from '../../../CommonUtitlites/Others/commonExportVariable';
import Loader from '../../../CommonUtitlites/Loader/Loader';


const fields = [
  { label: 'MRN Date', name: 'mrnDate', type:'date', value:currentDate },
  { label: 'PO Number', name: 'poNumber' },
  { label: 'Vendor Name', name: 'vendorName' },
  { label: 'Invoice Number', name: 'invoiceNumber' },
  { label: 'Invoice Date', name: 'invoiceDate', type:'date' },
  { label: 'Transporter Name', name: 'transporterName' },
  { label: 'GR Date', name: 'grDate', type:'date' },
  { label: 'GR Document File Key', name: 'grDocumentFileKey' },
  { label: 'Vehicle Number', name: 'vehicleNumber' },
  { label: 'Eway Bill Number', name: 'ewayBillNumber' },
  { label: 'Storage Location', name: 'storageLocation' },

  { label: 'MRN Contractor Name', name: 'mrnContractorName' },
  { label: 'MRN GP Name', name: 'mrnGpName' },
  { label: 'Remark', name: 'remark' },
];



const MaterialRequisitionPO = () => {
  const [tableData, setTableData] = useState([])
  const [loading, setLoading] = useState(false);

  const handleSubmit =  async(e) =>{
    e.preventDefault();
    setLoading(true);
    setLoading(false);
  }

  return (
    <div className="App">
      { loading?<Loader/>:<form>

        <div className="grid-container row">
          <div className="col-md-6">
            {fields.slice(0, Math.ceil(fields.length / 2)).map((field, index) => (
              <div className="grid-item form-row" key={index}>
                <label htmlFor={field.name}>{field.label}:</label>
                <input value={field.value?field.value:""} type={field.type?field.type:"text"} className='form-control' name={field.name} id={field.name} />
              </div>
            ))}
          </div>

          <div className="col-md-6">
            {fields.slice(Math.ceil(fields.length / 2)).map((field, index) => (
              <div className="grid-item form-row" key={index}>
                <label htmlFor={field.name}>{field.label}:</label>
                <input value={field.value?field.value:""} type={field.type?field.type:"text"} className='form-control' name={field.name} id={field.name} />
              </div>
            ))}
          </div>
          
        </div>

              <MRPOEditableTable tableData={(data)=>setTableData(data)} />

        <button className='btn float-right btn-lg' type='submit'>Submit</button>
      </form>
      }
    </div>
  );
};

export default MaterialRequisitionPO;
//   { label: 'Material Main Group', name: 'materialMainGroup' },
//   { label: 'Material Sub Group', name: 'materialSubGroup' },
//   { label: 'Item Description', name: 'itemDescription' },
//   { label: 'PO Quantity', name: 'poQuantity' },
//   { label: 'Balance MRN', name: 'balanceMrn' },
//   { label: 'MRN UOM', name: 'mrnUom' },
//   { label: 'MRN Quantity', name: 'mrnQuantity' },
//   { label: 'MRN Rate', name: 'mrnRate' },
//   { label: 'MRN Amount', name: 'mrnAmount' },
