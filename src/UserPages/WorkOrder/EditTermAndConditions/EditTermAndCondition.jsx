import React, { useEffect, useState } from "react";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  userId,
  role,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import styles from "./WorkOrder.module.css";
import Swal from "sweetalert2";
import { formFields } from "../formFields";
import ReactQuill from "react-quill";

export default function EditTermAndCondition({ setEdit }) {
  // const [customText, setCustomText] = useState("");
  // const [customTitle, setCustomTitle] = useState("");
  // const [toggle, setToggle] = useState(false);

  const [status, setStatus] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});

  const [templates, setTemplates] = useState([]);
  const [results, setResults] = useState([]);
  const [templateId, setTemplateId] = useState("");

  const handleSelectedTemplate = async (id) => {
    setTemplateId(id);
    setSelectedOptions([]);
    // console.log("here")
    let result = api.post(
      `/get-wo-termsAndConditionTemplate-selectedTemplate`,
      {
        userId,
        role,
        templateId: id,
      }
    );
    result = await errorHandler(result);
    console.log(result);
    setResults(result.data.data);

    const processedFieldIds = new Set();

    const updatedFormFieldWithOptions = await Promise.all(
      formFields.map(async (field) => {
        if (processedFieldIds.has(field.id)) {
          return []; // Skip processing if fieldId is already processed
        }
        processedFieldIds.add(field.id); // Mark fieldId as processe
        const options = result.data.data;
        let resultArray = {
          fieldId: field.id,
          fieldLabel: field.label,
          options: options[field.id],
        };
        return resultArray;
      })
    );
    // console.log(updatedFormFieldWithOptions)
    // Flatten the nested array of options
    const flattenedOptions = updatedFormFieldWithOptions.flat();
    // console.log(flattenedOptions);
    setSelectedOptions(flattenedOptions);
  };

  useEffect(() => {
    const getTemplateNames = async () => {
      let result = api.post("/get-wo-termsAndConditionTemplate");
      result = await errorHandler(result);
      // console.log(result);
      setTemplates(result.data.data);
    };
    getTemplateNames();
  }, []);

  const handleEditSubmit = async (id) => {
    // console.log(results)
    let result = api.post(`/edit-wo-termsAndConditionTemplate`, {
      userId,
      role,
      templateId: templateId,
      selectedOptions: results,
    });
    result = await errorHandler(result);
    setResults(result.data.data);
    Swal.fire({
      title: result.data.message,
      icon: "success",
    });
    setStatus(!status);
    setEdit(status);
  };

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

  const handleSelectChange = (value, fieldId) => {
    setResults((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [fieldId]: value,
    }));
  };

  return (
    <div>
      <select
        className="form-control"
        value={templateId}
        onChange={(e) => handleSelectedTemplate(e.target.value)}
        required
      >
        <option>Select Template</option>
        {templates.map((template) => (
          <option value={template._id}>{template.name}</option>
        ))}
      </select>

      <label htmlFor="nameOfTemplate">Name Of Template</label>

      <input
        className="form-control"
        id="nameOfTemplate"
        value={results["nameOfTemplate"] || ""}
        onChange={(e) => handleSelectChange(e.target.value, "nameOfTemplate")}
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
                  value={results[field.id]}
                  onChange={(html) => handleSelectChange(html, field.id)}
                />
              </div>
            </div>
          </div>
        ))}

      <button
        className="btn btn-block my-3"
        type="button"
        onClick={handleEditSubmit}
      >
        Submit
      </button>
    </div>
  );
}
