import React, { useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from 'sweetalert2';
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import styles from "./WorkOrder.module.css";

export default function AddTermAndCondition(props) {
  // const [customText, setCustomText] = useState("");
  // const [customTitle, setCustomTitle] = useState("");
  // const [toggle, setToggle] = useState(false);


  const [selectedOptions, setSelectedOptions] = useState({});
  const handleAddOption = async (e) => {
    // console.log("here");
    e.preventDefault(); // Prevent the default form submission behavior

    let result = api.post(`/create-wo-termsAndConditionTemplate`, {
      userId,
      role,
      selectedOptions 
    });

    result = await errorHandler(result);
    Swal.fire(result.data.message);
    // alert(result.data.message);
    // console.log(result);

    props.setToggle(result.data.data.createdAt);
  };
  // console.log(props.name)

  const formFields = [
  
    {
      label: "Scope Of Work",
      id: "scopeOfWork",
    },
    {
      label: "Price Basis",
      id: "priceBasis",
    },
    {
      label: "Taxes and duties",
      id: "taxesAndDuties",
    },
    {
      label: "Payment Terms",
      id: "paymentTerms",
    },
    {
      label: "Work Completion Schedule",
      id: "workCompletionSchedule",
    },
    {
      label: "Key Materials Procurement",
      id: "keyMaterialsProcurement",
    },
    {
      label: "Inspections",
      id: "inspections",
    },
    {
      label: "Defect Liability Period",
      id: "defectLiabilityPeriod",
    },
    {
      label: "Safety Requirements",
      id: "safetyRequirements",
    },
    {
      label: "Statutory Requirements",
      id: "statutoryRequirements",
    },
   
    {
      label: "Dispute - Resolution",
      id: "other",
    },
    {
      label: "Company Provided Materials",
      id: "transportation",
    },
    {
      label: "Performance And Termination",
      id: "performanceAndTermination",
    },
  ];

  // const handlePlaceholder = (fieldId) => {
  //   const label =
  //     formFields.find((field) => field.id === fieldId)?.label ||
  //     "Label not found";
  //   return label;
  // };

  // const handleCustomTextChange = (e) => {
  //   const text = e.target.value;
  //   setCustomText(text);
  // };

  


  const handleSelectChange = (event, fieldId) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldId]: event.target.value,
    }));
  };

  return (
    <div>
 <label htmlFor="nameOfTemplate">
                    Name Of Template
                  </label>
                  
<input 
className="form-control"
id="nameOfTemplate"
value={selectedOptions["nameOfTemplate"]||""}
onChange={(e) => handleSelectChange(e, "nameOfTemplate")}
/>

{formFields &&
              formFields.map((field, index) => (
                <div className={styles.select_container} key={index}>
                  <label htmlFor={field.id}>
                    {index + 1}. {field.label}
                  </label>
                  
                  <textarea
                    style={{ textAlign: "justify" }}
                    className="form-control"
                    id={`textarea_${field.id}`}
                    name={`textarea_${field.id}`}
                    value={selectedOptions[field.id] || ""}
                    onChange={(e) => handleSelectChange(e, field.id)}
                  />
                </div>
              ))}



 

      <button
        className="btn btn-block my-3"
        type="button"
        onClick={handleAddOption}
      >
        Add
      </button>
    </div>
  );
}
