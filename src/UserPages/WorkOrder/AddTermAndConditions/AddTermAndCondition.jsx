import React, { useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import Swal from "sweetalert2";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import styles from "./WorkOrder.module.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formFields } from "../formFields";
export default function AddTermAndCondition(props) {
  const [nameOfTemplate, setNameOfTemplate] = useState("");
  const initialFormState = {};
  formFields.forEach((field) => {
    initialFormState[field.id] = "";
  });
  const [selectedOptions, setSelectedOptions] = useState(initialFormState);
  const handleAddOption = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    let result = api.post(`/create-wo-termsAndConditionTemplate`, {
      userId,
      role,
      selectedOptions,
    });

    result = await errorHandler(result);
    Swal.fire(result.data.message);
    props.setToggle(result.data.data.createdAt);
  };

  

  // Create a state variable for each Quill editor

  const handleQuillChange = (fieldId, html) => {
    setSelectedOptions({
      ...selectedOptions,
      [fieldId]: html,
    });
  };

  return (
    <div>
      <label htmlFor="nameOfTemplate">Name Of Template</label>

      <input
        className="form-control"
        id="nameOfTemplate"
        value={selectedOptions['nameOfTemplate']}
        onChange={(e) => handleQuillChange('nameOfTemplate',e.target.value)}
      />

      {formFields &&
        formFields.map((field, index) => (
          <div className={styles.select_container} key={index}>
            <label htmlFor={field.id}>
              {index + 1}. {field.label}
            </label>
            <div className="form-group">
              <div className="editor-container">
                <ReactQuill
                  value={selectedOptions[field.id]}
                  onChange={(html) => handleQuillChange(field.id, html)}
                />
              </div>
            </div>
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
