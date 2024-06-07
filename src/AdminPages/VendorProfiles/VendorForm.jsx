import React, { useEffect, useState } from "react";
import GstDetails from "./VendorFormParts/GstDetails";
import PanDetails from "./VendorFormParts/PanDetails";
import UidDetails from "./VendorFormParts/UidDetails";
import OfficeAdd from "./VendorFormParts/OfficeAdd";
import TableOfForm from "./VendorFormParts/TableOfForm";
import BankDetails from "./VendorFormParts/BankDetails";
import html2pdf from "html2pdf.js";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
import { Navigate, useNavigate } from "react-router-dom";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  role,
  userId,
  userName,
} from "../../CommonUtitlites/Others/commonExportVariable";
import Loader from "./VendorFormParts/Loader/Loader";
import ReactQuill from "react-quill";
import ReactSelect from "react-select";
import useCategoryData from "../../CommonUtitlites/customHooks/useGetCategory";
import PfRegistration from "./VendorFormParts/PfDetails";
import EsicRegistration from "./VendorFormParts/EsicDetails";

export default function VendorForm() {
  const [contactPersons, setContactPersons] = useState([
    { name: "", email: "", contactNumber: "" },
  ]);
  let productCategory = useCategoryData()
  const [categoryOption, setCategoryOption] = useState([])

  useEffect(() => {
   if(productCategory){
    let data = productCategory.map(data => ({value:data.name, label:data.name}))
    console.log(data)
    setCategoryOption(data)
   }
  }, [productCategory])
  
  const [paymentTerms, setPaymentTerms] = useState("");
const [selectedOptions, setSelectedOptions] = useState([])

const handleContactPersonChange = (index, field, value) => {
    const updatedContactPersons = [...contactPersons];
    updatedContactPersons[index][field] = value;
    setContactPersons(updatedContactPersons);
  };

  const [tableData, setTableData] = useState([]);
  console.log(tableData);

  const addContactPersonRow = () => {
    setContactPersons([
      ...contactPersons,
      { name: "", email: "", contactNumber: "" },
    ]);
  };

  const [loader, setLoader] = useState(false);

  const [verifyFields, setVerifyFields] = useState({
    validateAadhaar:false,
    validateGst:false,
    validatePan:false,
    validateBank:false,
 
    // verifyPf:false,
  })


  const handleSubmit = async (e) => {
    // console.log("here")
    e.preventDefault();
    if (!verifyFields.validateGst) {
      Swal.fire({
        title: "Error!",
        text: "GST is not filled or validate.",
        icon: "error",
        button: "OK",
      });
      return;
    } else if (!verifyFields.validatePan) {
      Swal.fire({
        title: "Error!",
        text: "PAN is not filled or validate.",
        icon: "error",
        button: "OK",
      });
      return;
    } else if (!verifyFields.validateBank) {
      Swal.fire({
        title: "Error!",
        text: "Bank details are filled or validate.",
        icon: "error",
        button: "OK",
      });
    } else {
      Swal.fire({
        title: "Success!",
        text: "All fields are valid!",
        icon: "success",
        button: "OK",
      });
    }

    setLoader(true);
 

     
    const formData = new FormData(e.target);

    


    const options = {
      image: { type: "jpeg", quality: 1 }, // Set image type and quality
      html2canvas: { scale: 2 }, // Adjust the scale of the HTML content
      jsPDF: { format: "a4", orientation: "portrait" }, // Set the PDF format and orientation
      margin: [10, 10, 10, 10],
    };
    // Generate the PDF from the form data
    html2pdf()
      .set(options)
      .from(e.target)
      .set({ dpi: 600 })
      .output("blob")
      .then(async function (pdfBlob) {
        // Create a new FormData object to send the form data and the PDF blob
        const payload = new FormData();
        // Append the form data to the payload
        const contactPersonsData = [];

        // Loop through each contact person and add their details to the array
        for (const contactPerson of contactPersons) {
          const { name, email, contactNumber } = contactPerson;
          contactPersonsData.push({ name, email, contactNumber });
        }
        payload.append(
          "authorizedContactPerson",
          JSON.stringify(contactPersonsData)
        );
        payload.append("projectDetails", JSON.stringify(tableData));

        const bankAccName = formData.get("accountHolderName");
        const bankAccNo = formData.get("accountNumber");
        const bankIfscNo = formData.get("ifscCode");

        for (const [key, value] of formData.entries()) {
          payload.append(key, value);
          console.log(key, value);
        }
        // const productCategoryArray = formData.get("productCategory");
        payload.append("paymentTerms",paymentTerms)
        // payload.append("productCategory",productCategoryArray)

        payload.append("bankInfo[bankAccName]", bankAccName);
        payload.append("bankInfo[bankAccNo]", bankAccNo);
        payload.append("bankInfo[bankIfscNo]", bankIfscNo);

        payload.append("pdf", pdfBlob, "Output.pdf");

        // console.log(payload)
        // console.log(formData)
        // Send the payload to the backend
        console.log(payload);
        payload.append("userId", userId);
        payload.append("role", role);
        payload.append("userName", userName);

        await api
          .post("/postData", payload)
          .then(async (response) => {
            // Handle the backend response here
            const result = response.data;
            console.log(result);
            if (result.msg === true) {
              // Use SweetAlert instead of alert
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Successfully Added",
              });
              // alert("Successfully Added")
              // navigate('/search')
              setLoader(false);
            } else {
              Swal.fire("Please Fill the Form Correctly");
              // alert("Please Fill the Form Correctly")
              setLoader(false);
            }
            console.log("Form data and PDF uploaded successfully!");
          })

          .catch((error) => {
            console.log(error);
            setLoader(false);
            // Handle any errors that occurred during the request
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Error uploading form data and PDF: " + error,
            });
            // alert('Error uploading form data and PDF:', error);
          });
      });
  };
  const navigate = useNavigate();

  console.log(verifyFields)
  const [ statutoryCompliances, setIsStatutoryCompliancesApplicable] = useState("true"); // Default to 'yes'

  return (
    <>
      <div className="title">
        <span>Vendor Information Form</span>

        <button
          className="btn"
          onClick={() => navigate("/admin/vendorProfile")}
        >
          {" "}
          Show Vendor Database
        </button>
        <button
          className="btn"
          onClick={() => navigate("/admin/vendorapproval")}
        >
          
          Vendor Approval
        </button>
        
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <form className="form-grid" onSubmit={handleSubmit}>
            <h6 className="text-decoration-underline">Vendor Details</h6>
            <div className="row mb-0">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="vendorName">Vendor Name*</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    id="vendorName"
                    placeholder="Enter Vendor Name"
                    name="vendorName"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="vendorEmail">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="vendorEmail"
                    placeholder="Enter Email"
                    name="vendorEmail"
                  />
                </div>
                <PanDetails validatePan={(verified)=>setVerifyFields({...verifyFields, validatePan:verified})}/>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="tradeName">Trade Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="tradeName"
                    placeholder="Enter Trade Name"
                    name="tradeName"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="vendorPhone">Phone</label>
                  <input
                    className="form-control"
                    type="tel"
                    id="vendorPhone"
                    placeholder="Enter Phone"
                    name="vendorPhone"
                  />
                </div>
                <GstDetails validateGst={(verified)=>setVerifyFields({...verifyFields, validateGst:verified})}/>
              </div>
            </div>
            <div className="row mt-0">
              <div className="col-md-6">
                {/* <UidDetails validateAadhaar={(verified)=>setVerifyFields({...verifyFields, validateAadhaar:verified})} /> */}

                <div className="form-group">
                  <label htmlFor="natureOfBusiness">Nature of Business</label>
                  <select
                    className="form-control"
                    id="natureOfBusiness"
                    name="natureOfBusiness"
                  >
                    <option value="">Select Nature Of Buisness</option>
                    <option value="Suppliers">Suppliers</option>
                    <option value="Services">Services</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Execution">Execution</option>
                    <option value="Rental">Rental</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="registeredOfficeAddress">
                    Registered Office Address
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="registeredOfficeAddress"
                    placeholder="Enter Registered Office Address"
                    name="registeredOfficeAddress"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="vendorCategory">Type of Organization</label>
                  <select
                    className="form-control"
                    id="vendorCategory"
                    name="vendorCategory"
                  >
                    <option value="">Select Type Of Organization</option>
                    <option value="Proprietary">Proprietary</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Pvt. Ltd.">Pvt. Ltd.</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="vendorWebsite">Website</label>
                  <input
                    className="form-control"
                    type="text"
                    id="vendorWebsite"
                    placeholder="Enter Website"
                    name="vendorWebsite"
                  />
                </div>
                <OfficeAdd />
              </div>
              <BankDetails validateBank={(verified)=>setVerifyFields({...verifyFields, validateBank:verified})} />
            </div>
            <h6 className="text-decoration-underline mt-4">
              Authorized Contact Person(s)
            </h6>
            <div className="row">
              <div className="col-md-6">
                {contactPersons.map((contactPerson, index) => (
                  <div key={index}>
                    <div className="form-group">
                      <label htmlFor={`authorizedContactPersonName${index}`}>
                        Name*
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        required
                        id={`authorizedContactPersonName${index}`}
                        placeholder="Enter Name"
                        value={contactPerson.name}
                        onChange={(e) =>
                          handleContactPersonChange(
                            index,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`authorizedContactPersonEmail${index}`}>
                        Email ID
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        id={`authorizedContactPersonEmail${index}`}
                        placeholder="Enter Email ID"
                        value={contactPerson.email}
                        onChange={(e) =>
                          handleContactPersonChange(
                            index,
                            "email",
                            e.target.value
                          )
                        }
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor={`authorizedContactPersonNumber${index}`}>
                        Contact Number
                      </label>
                      <input
                        className="form-control"
                        type="tel"
                        id={`authorizedContactPersonNumber${index}`}
                        placeholder="Enter Contact Number"
                        value={contactPerson.contactNumber}
                        onChange={(e) =>
                          handleContactPersonChange(
                            index,
                            "contactNumber",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={addContactPersonRow}
                >
                  Add Contact Person
                </button>

                {/* <div className="form-group">
                  <label htmlFor="esicRegistrationNumber">
                    ESIC Registration Number
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    id="esicRegistrationNumber"
                    placeholder="Enter ESIC Registration Number"
                    name="esicRegistrationNumber"
                  />
                </div> */}
                 
                <div className="form-group">
                  <label htmlFor="annualTurnover">
                    Annual Turnover (Enter '0' if you are new or have no turn
                    over)
                  </label>
                  <input
                    className="form-control"
                    type="tel"
                    // required
                    id="annualTurnover"
                    placeholder="Enter Annual Turnover"
                    name="annualTurnover"
                  />
                </div>
              </div>
              <div className="col-md-6">
                {/* <div className="form-group">
              <label htmlFor="authorizedContactPersonNumber">
                Contact Number
              </label>
              <input
                className="form-control"
                type="tel"
                id="authorizedContactPersonNumber"
                placeholder="Enter Contact Number"
                name="authorizedContactPersonNumber"
              />
            </div> */}

<div style={{ marginTop: '1rem' }}>
        <label>Is this vendor/contractor applicable for statutory compliances?</label>
        <div>
          <label>
            <input
              type="radio"
              name="statutoryApplicable"
              value={"true"}
              checked={statutoryCompliances === "true"}
              onChange={(e) => setIsStatutoryCompliancesApplicable(e.target.value)}
            />
            Yes
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="statutoryApplicable"
              value={"false"}
              checked={statutoryCompliances === "false"}
              onChange={(e) => setIsStatutoryCompliancesApplicable(e.target.value)}
            />
            No
          </label>
        </div>
      </div>
            {
              statutoryCompliances=='true'?
              <>
               <label htmlFor="qualityCertification">
              Statutory Compliances
                  </label>
            <PfRegistration/>
           <EsicRegistration />
              </>
              :
              ""
            }


                <div className="form-group">
                  <label htmlFor="qualityCertification">
                    Quality and Certification
                  </label>
                  <select
                    className="form-control"
                    id="enterQualityCertification"
                    name="qualityCertification"
                  >
                    <option value="">Select Quality and Certifications</option>
                    <option value="ISI">ISI</option>
                    <option value="ISO">ISO</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="projectExperience">
                Details of Project Experience*
              </label>
              <textarea
                className="form-control"
                type="text"
                // required
                rows={5}
                id="projectExperience"
                placeholder="Enter Details of Project Experience"
                name="projectExperience"
              />
            </div>
            <TableOfForm setTableData={(data) => setTableData(data)} />
            <div
              className="row"
              style={{ display: "flex", justifyContent: "space-around" }}
            >
              <div className="col-md-4">
                <div className="form-group">
                  <label htmlFor="copyOfCheque">
                    Please attach a copy of the cheque
                  </label>
                  <input
                    type="file"
                    required
                    className="form-control-file"
                    id="copyOfCheque"
                    name="copyOfCheque"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attachmentSheet">
                    Please attach separate sheet if necessary
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="attachmentSheet"
                    name="attachmentSheet"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="gstScreenShotPdf">
                    Please attach screenshot of GST And PAN Verification
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="gstScreenShotPdf"
                    name="gstScreenShotPdf"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="attachmentWOCopies">
                    Please attach WO/Agreement/PO Copies
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="attachmentWOCopies"
                    name="attachmentWOCopies"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="attachmentCompletionCertificates">
                    Please attach copy of Completion and Certificates for order
                    completed
                  </label>
                  <input
                    type="file"
                    className="form-control-file"
                    id="attachmentCompletionCertificates"
                    name="attachmentCompletionCertificates"
                  />
                </div>
              </div>
            </div>
            <div className="row">
            <div
              className="col-md-12"
              style={{ display: "block"}}
            >
              <div className="form-group">
                <label htmlFor="enterProjectName">Payment Terms</label>
                <ReactQuill
                  className="quill-form-control"
                  value={paymentTerms}
                  onChange={(html) => setPaymentTerms(html)}
                  placeholder="Enter Payment Terms"
                 
                  // modules={{
                  //   toolbar: [
                  //     [{ header: [1, 2, false] }],
                  //     ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                  //     [{ list: 'ordered' }, { list: 'bullet' }],
                  //     // ['link', 'image'],
                  //   ],
                  // }}
                />
              </div>
              <div className="col-md-12">
          <div className="form-group">
            <label htmlFor="category">Supplier Of Following Product</label>
            <ReactSelect
              isMulti
              name="productCategory"
              // isDisabled={!edit}
              options={categoryOption}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />
          </div>
          </div>
        </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="enterProjectName">Project Name *</label>
                  <input
                    className="form-control"
                    type="text"
                    required
                    id="enterProjectName"
                    placeholder="Enter Project Name"
                    value={"Water Project"}
                    name="projectName"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="category">Category*</label>
                  <select
                    className="form-control"
                    id="category"
                    name="category"
                    required
                  >
                    <option value="">Select Category </option>
                    <option value="Suppliers">Suppliers</option>
                    <option value="Services">Services</option>
                    <option value="Consultancy">Consultancy</option>
                    <option value="Rental">Rental</option>
                    <option value="Execution">Execution</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
              </div>
            </div>
            <h5
          style={{
            color: "red",
            textAlign: "center",
            display: ( verifyFields.validateGst && verifyFields.validatePan && verifyFields.validateBank)? "none" : "block",
          }}
        >
          Please verify Pan, GST and Bank Info First and then Click Submit
        </h5>
            <div
              className="d-flex mt-3"
              style={{ justifyContent: "space-around" }}
            >
              <button
                className="btn btn-outline-primary mx-4"
                
                type="submit"
              >
                Submit
              </button>
              <button className="btn btn-outline-primary mx-4" onClick={print}>
                Print Page
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
