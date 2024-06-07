import React, { useEffect, useState } from "react";
import styles from './quotation.module.css'
import {
  role,
  userId,
  userName,
} from "../../../CommonUtitlites/Others/commonExportVariable";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import EditableTableForQuotationShow from "./EditableTableForQuotationShow";
import useGetVendors from "../../../CommonUtitlites/customHooks/useGetAllVendors";
import SearchInputVendor from "../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputVendor";
import Loader from "../../../CommonUtitlites/Loader/Loader";

function QuotationFormShow({ data }) {
  const [project, setProject] = useState('')
  const [vendor, setVendor] = useState("")

  const [tableData, setTableData] = useState([])
  const [files, setFiles] = useState([]);
  const [fileName, setFileName] = useState(""); // State to store the name of the selected file
  const [isLoading, setIsLoading] = useState(false); // State to manage loader visibility


  useEffect(() => {
    console.log(data)
    setProject(data)
  }, [data])

  const uploadFileToS3 = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return null; // Return null if no file is selected
    }

    const formData = new FormData();
    formData.append("quotationFile", file); // Change field name to "file"

    try {
      // Call your API to upload the file to S3
      const response = await api.post("/quotation-upload-to-s3", formData);
      console.log("File uploaded successfully:", response.data);

      // Extract the URL from the response
      const fileUrl = response.data.urls[0].url;
      console.log("File URL:", fileUrl);

      // Return the file URL
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle error or display error message
      alert("Error uploading file. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData(e.target);
    const prId = formData.get("prId");

    const quotationFiles = files.map(file => file.name).join(",");


    const formData2 = new FormData()
    // let data = {};
    // data.vendorId = vendor.id;
    // data.vendorName = vendor.name;
    // data.projectName = project.projectName;
    // data.projectId = project.projectId;
    // data.tableData = tableData;
    // data.userId = userId;
    // data.role = role;
    // data.userName = userName;
    // data.prId = prId;
    formData2.append("vendorId", vendor.id);
    formData2.append("vendorName", vendor.name);
    formData2.append("projectName", project.projectName);
    formData2.append("projectId", project.projectId);
    formData2.append("tableData", JSON.stringify(tableData));

    formData2.append("userId", userId);
    formData2.append("role", role);
    formData2.append("userName", userName);
    formData2.append("prId", prId);
    // data.quotationFileUrl = fileUrl;
    formData2.append("quotationFile", quotationFiles); // Change field name to "file"

    // console.log("Files:", quotationFiles);

    try {
      // Make API call to create quotation
      const result = await api.post("/create-quotation", formData2, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      await errorHandler(result);
      alert(result.data.message);
    } catch (error) {
      console.error(error);
      alert("Error occurred while creating quotation. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader after API call is completed
    }
  };

  const [isContractor, setIsContractor] = useState(true);

  const handleToggle = () => {
    setIsContractor(!isContractor);
  };

  // let projects = useGetAllProjectsForAdmin()
  let vendors = useGetVendors()
  console.log(tableData);

  // Function to handle file upload
  const handleFileUpload = (e) => {
    const selectedFiles = e.target.files;
    const fileList = Array.from(selectedFiles); // Convert FileList to an array
    setFiles(fileList);
    setFileName(fileList.map(file => file.name).join(', ')); // Set the names of the selected files
  };
  



  return (
    <div>
     {isLoading ? <Loader/> : 
      <form id="form" className="form-grid" onSubmit={(e) => handleSubmit(e)}>
      <div className="form-row">
        <label htmlFor="prId">PR Id</label>
        <input
          type="text"
          className="form-control"
          name="prId"
          value={data.prId}
          id="prId"
          placeholder="PR Id"
          required
        />
      </div>

      <div className="form-row">
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          className="form-control"
          name="projectName"
          value={data.projectName}
          id="projectName"
          placeholder="Project Name"
          required
        />

      </div>

      <div className="form-row">
        <label htmlFor="employeName">Employer Name</label>
        <input
          type="text"
          className="form-control"
          name="employeName"
          value={userName}
          id="employeName"
          placeholder="Employer Name"
          required
        />

      </div>

      {/* <div className={`${styles.formCheck} ${styles.formSwitch}`}>
        <input
          type="checkbox"
          className={`${styles.formCheckInput} ${styles.sliderCheckbox}`}
          style={{ display: "none" }}
          id="toggleSwitch"
          checked={isContractor}
          onChange={handleToggle}
        />
        <label
          className={`${styles.formCheckLabel} ${styles.slider}`}
          htmlFor="toggleSwitch"
        >
         // {isContractor ? 'Switch to Vendor' : 'Switch to Contractor'}
        </label>
      </div> */}
      {/* <span>
        {" "}
        Toggle To {isContractor ? "Switch to Vendor" : "Switch to Contractor"}
      </span> */}

      <SearchInputVendor
        // title={`Select ${isContractor ? "Switch to Vendor" : "Switch to Contractor"}`}
        title={`Select Vendor`}
        // placeholder={`Select ${isContractor ? "Switch to Vendor" : "Switch to Contractor"}`}
        placeholder={`Select Vendor`}
        items={vendors}
        ResultOnClick={(data) => setVendor(data)}
      />



      <EditableTableForQuotationShow tableData={data.tableData} setTableData={(tableData) => setTableData(tableData)} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <label htmlFor="fileUpload" className="btn">
          Attach File
          <input
            type="file"
            id="fileUpload"
            multiple
            accept="application/pdf"
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </label>
        {/* Display the name of the selected file */}
        {fileName && <span>{fileName}</span>}
      </div>


      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button className="btn" type="submit">
          Submit
        </button>


      </div>
    </form>}
    </div>
  );
}

export default QuotationFormShow;
