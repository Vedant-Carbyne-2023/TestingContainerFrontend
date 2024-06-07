import { useEffect, useState } from "react";
import Select from "react-select";
import Swal from "sweetalert2";
import html2pdf from 'html2pdf.js';
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { role, userId } from "../../CommonUtitlites/Others/commonExportVariable";
import useCategoryData from "../../CommonUtitlites/customHooks/useGetCategory";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
const VendorProfilePart = ({ entry, change }) => {
  // console.log('welcome', entry);
  const [changed, setChanged] = useState(false)

  let productCategory = useCategoryData()
  const [categoryOption, setCategoryOption] = useState([])
  const [paymentTerms, setPaymentTerms] = useState(entry.paymentTerms?entry.paymentTerms:"")

  


  const categoryOptions = [
    { value: "Suppliers", label: "Suppliers" },
    { value: "Services", label: "Services" },
    { value: "Consultancy", label: "Consultancy" },
    { value: "Execution", label: "Execution" },
    { value: "Others", label: "Others" },
  ];
  const qualityOptions = [
    { value: "ISI", label: "ISI" },
    { value: "ISO", label: "ISO" },
    { value: "Others", label: "Others" },
  ];
  const organisationOptions = [
    { value: "Proprietary", label: "Proprietary" },
    { value: "Partnership", label: "Partnership" },
    { value: "Pvt. Ltd.", label: "Pvt. Ltd." },
    { value: "Others", label: "Others" },
  ];


  
  const [selectedCategoryOptions, setSelectedCategoryOptions] =  useState("");
    console.log(selectedCategoryOptions)
  
    useEffect(() => {
      if(productCategory){
        let data = productCategory.map(data => ({value:data.name, label:data.name}))
        // console.log(data)
        setCategoryOption(data)
        if(entry.productCategory)
        {let filterData =  entry.productCategory? data.filter((option) => entry.productCategory.includes(option.value)):""
        setSelectedCategoryOptions(filterData)
      }

      }
    }, [productCategory, entry.productCategory])



  const [selectedOptions, setSelectedOptions] = useState(
    entry.category? categoryOptions.filter((option) => entry.category.includes(option.value))
    :""
  );
  const [selectedQualityOptions, setSelectedQualityOptions] = useState(
    entry.qualityCertification ? qualityOptions.filter((option) =>
      entry.qualityCertification.includes(option.value)
    ) :""
  );
  const [selectedOrganisationOptions, setSelectedOrganisationOptions] =
    useState(
      entry.vendorCategory?
      organisationOptions.filter((option) =>
        entry.vendorCategory.includes(option.value)
      ):
      ""
    );
    const [contactPersons, setContactPersons] = useState([
      { name: "", email: "", contactNumber: "" },
    ]);
  // Handle the change event when options are selected/deselected

  const [loader, setLoader] = useState(false);
  const [edit, setEdit] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoader(true);

    try {
      const formData = new FormData(e.target);
      const options = {
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: { format: 'a4', orientation: 'portrait' },
        margin: [10, 10, 10, 10],
      };

      const pdfBlob = await html2pdf()
        .set(options)
        .from(e.target)
        .set({ dpi: 600 })
        .output('blob');

      // Create a new FormData object to send the form data and the PDF blob
      const payload = new FormData();

      // Add form data fields
      for (const [key, value] of formData.entries()) {
        payload.append(key, value);
      }
      payload.append("gstNumber",entry.gstNumber)
      payload.append("panNumber",entry.panNumber)
      payload.append("vendor_code",entry.vendor_code)
      payload.append("paymentTerms",paymentTerms)
      // Add PDF blob with a filename
      payload.append('pdf', pdfBlob, 'Output.pdf');

      // Add additional fields like userId and role
      payload.append('userId', userId);
      payload.append('role', role);

      // Send the payload to the backend
      const response = await api.post('/postData', payload);

      if (response.data.msg === true) {
        // Handle success
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Successfully Added',
        });

        setChanged(!changed)
        change(changed)
        setLoader(false);

      } else {
        // Handle validation errors or other issues
        Swal.fire('Please Fill the Form Correctly');
      }

      setLoader(false);
    } catch (error) {
      console.error('An error occurred:', error);
      setLoader(false);

      // Handle any errors that occurred during the request
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error uploading form data and PDF: ' + error.message,
      });
    }
  };
  console.log("here", edit);

  return (
    <>
    <form onSubmit={handleSubmit}>
    <button className="btn" style={{display:'flex', margin:"auto"}}  type="button" onClick={() => setEdit(true)}>
            Edit
          </button>
      <div className="row mb-0">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="vendorCode">Vendor Code*</label>
            <input
              disabled
              className="form-control"
              type="text"
              id="vendorCode"
              defaultValue={entry.vendor_code}
              name="vendorCode"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendorName">Vendor Name*</label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="vendorName"
              defaultValue={entry.vendorName}
              name="vendorName"
            />
          </div>
          <div className="form-group">
            <label htmlFor="vendorEmail">Email</label>
            <input
              disabled={!edit}
              className="form-control"
              type="email"
              id="vendorEmail"
              placeholder="Not Available"
              defaultValue={entry.vendorEmail}
              name="vendorEmail"
            />
          </div>
          <div className="form-group">
            <label htmlFor="panNumber">Pan Number</label>
            <div className="input-wrapper">
              <input
                disabled
                variant="standard"
                className="mb-3 form-control"
                type="text"
                name="panNumber"
                defaultValue={entry.panNumber}
                size="medium"
              />
            </div>
            <div>
              <label htmlFor="pan_front">PAN Front:</label>
              <div>
                <a
                  href={entry.pan_front}
                  style={{
                    display: "block",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    textDecoration: "none",
                    color: "#333",
                    backgroundColor: "#e9ecef",
                  }}
                >
                  Pan Card Front Photo Link
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="tradeName">Trade Name</label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="tradeName"
              defaultValue={entry.tradeName}
              name="tradeName"
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendorPhone">Phone</label>
            <input
              disabled={!edit}
              className="form-control"
              type="tel"
              id="vendorPhone"
              defaultValue={entry.vendorPhone}
              name="vendorPhone"
            />
          </div>
          {/* <GstDetails /> */}
          <div className="form-group">
            <label htmlFor="gstNumber">GST Number</label>

            <div className="input-wrapper">
              <input
                disabled
                className="form-control"
                placeholder="Not Available"
                type="text"
                name="gstNumber"
                defaultValue={entry.gstNumber}
              />
            </div>
          </div>

          <label htmlFor="aadhaarVerify">Aadhaar Number Linked</label>
            <div className="input-wrapper">
              <input
                disabled
                variant="standard"
                className="mb-3 form-control"
                type="text"
                name="aadhaarVerify"
                defaultValue={entry.aadhaarVerify}
                size="medium"
              />
            </div>
          <label htmlFor="aadhaarMaskedNumber">Masked Aadhaar Number</label>
            <div className="input-wrapper">
              <input
                disabled
                variant="standard"
                className="mb-3 form-control"
                type="text"
                name="aadhaarMaskedNumber"
                defaultValue={entry.aadhaarMaskedNumber}
                size="medium"
              />
            </div>
        </div>
      </div>

      <div className="row mt-0">
        <div className="col-md-6">
          {/* <UidDetails /> */}
          {/* <label htmlFor="aadhaarNumber">Aadhaar Number</label>
          <div className="input-wrapper">
            <input
              disabled
              className="form-control"
              placeholder="Not Available"
              type="text"
              name="aadhaarNumber"
              defaultValue={entry.aadharNumber}
            />
          </div>

          <label htmlFor="aadhaar_front">Aadhaar Front Photo </label>
          <div>
            <a
              href={entry.aadhaar_front}
              style={{
                display: "block",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#333",
                backgroundColor: "#e9ecef",
              }}
            >
              Aadhar Front Photo Link
            </a>
          </div>

          <label htmlFor="aadhaar_back">Upload Back of Adhaar </label>
          <div>
            <a
              href={entry.aadhaar_back}
              style={{
                display: "block",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                textDecoration: "none",
                color: "#333",
                backgroundColor: "#e9ecef",
              }}
            >
              Aadhar Back Photo Link
            </a>
          </div> */}

          <div className="form-group">
            <label htmlFor="natureOfBusiness">Nature of Business</label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="natureOfBusiness"
              placeholder="Not Available"
              defaultValue={entry.natureOfBusiness}
              name="natureOfBusiness"
            />
          </div>

          <div className="form-group">
            <label htmlFor="registeredOfficeAddress">
              Registered Office Address
            </label>
            <textarea
              disabled={!edit}
              className="form-control"
              type="text"
              id="registeredOfficeAddress"
              placeholder="Not Available"
              name="registeredOfficeAddress"
              defaultValue={entry.registeredOfficeAddress}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="qualityCertification">Type of Organization</label>
            <Select
              isMulti
              isDisabled={!edit}
              name="vendorCategory"
              options={organisationOptions}
              value={selectedOrganisationOptions}
              onChange={setSelectedOrganisationOptions}
            />
          </div>

          <div className="form-group">
            <label htmlFor="vendorWebsite">Website</label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="vendorWebsite"
              placeholder="Not Available"
              name="vendorWebsite"
              defaultValue={entry.vendorWebsite}
            />
          </div>
          {/* <OfficeAdd /> */}
          <div className="form-group">
            <label htmlFor="officeAddress" className="form-label">
              Office Address
            </label>
            <div className="input-group p-0 m-0">
              <textarea
                disabled={!edit}
                type="text"
                className="form-control"
                id="officeAddress"
                placeholder="Same as Registered"
                name="officeAddress"
                defaultValue={entry.officeAddress}
              />
            </div>
          </div>
        </div>
        {/* <BankDetails /> */}
        <div className="container">
          <h6 className="text-decoration-underline my-3">Bank Details</h6>

          <div className="form-group">
            <div className="form-group">
              <label htmlFor="accountHolderName">Account Holder Name</label>
              <input
                disabled
                className="form-control"
                placeholder="Not Available"
                type="text"
                name="accountHolderName"
                defaultValue={
                  entry.bankInfo
                    ? entry.bankInfo["bankAccName"]
                    : "Not Available"
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                disabled
                className="form-control"
                placeholder="Not Available"
                type="tel"
                name="accountNumber"
                defaultValue={
                  entry.bankInfo ? entry.bankInfo["bankAccNo"] : "Not Available"
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="ifscCode">IFSC Number</label>
              <input
                disabled
                className="form-control"
                placeholder="Enter IFSC Code"
                type="text"
                name="ifscCode"
                defaultValue={
                  entry.bankInfo
                    ? entry.bankInfo["bankIfscNo"]
                    : "Not Available"
                }
              />
            </div>
          </div>
        </div>
      </div>

      <h6 className="text-decoration-underline mt-4">
        Authorized Contact Person(s)
      </h6>
      <div className="row">
        <div className="col-md-6">
          {entry.authorizedContactPerson &&
            entry.authorizedContactPerson.map((person, index) => (
              <div key={index}>
                <div className="form-group">
                  <label htmlFor={`authorizedContactPersonName${index}`}>
                    Name*
                  </label>
                  <input
                    disabled={!edit}
                    className="form-control"
                    type="text"
                    id={`authorizedContactPersonName${index}`}
                    placeholder="Not Available"
                    defaultValue={person.name}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`authorizedContactPersonEmail${index}`}>
                    Email ID
                  </label>
                  <input
                    disabled={!edit}
                    className="form-control"
                    type="email"
                    id={`authorizedContactPersonEmail${index}`}
                    placeholder="Not Available"
                    defaultValue={person.email}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`authorizedContactPersonNumber${index}`}>
                    Contact Number
                  </label>
                  <input
                    disabled={!edit}
                    className="form-control"
                    type="tel"
                    id={`authorizedContactPersonNumber${index}`}
                    placeholder="Not Available"
                    defaultValue={person.contactNumber}
                  />
                </div>
              </div>
            ))}

          <div className="form-group">
            <label htmlFor="annualTurnover">Annual Turnover *</label>
            <input
              disabled={!edit}
              className="form-control"
              type="tel"
              id="annualTurnover"
              placeholder="0"
              name="annualTurnover"
              defaultValue={entry.annualTurnover}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="pfRegistrationNumber">PF Registration Number</label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="pfRegistrationNumber"
              placeholder="Not Available"
              name="pfRegistrationNumber"
              defaultValue={entry.pfRegistrationNumber}
            />
          </div>
          <label htmlFor="pf_number">Pf Registration File:</label>
              <div>
                <a
                  href={entry.pf_number}
                  style={{
                    display: "block",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    textDecoration: "none",
                    color: "#333",
                    backgroundColor: "#e9ecef",
                  }}
                >
                 Pf Registration Photo Link
                </a>
              </div>
          <div className="form-group">
            <label htmlFor="qualityCertification">
              Quality and Certification
            </label>
            <Select
              isMulti
              isDisabled={!edit}
              name="qualityCertification"
              options={qualityOptions}
              value={selectedQualityOptions}
              onChange={setSelectedQualityOptions}
            />
          </div>

          <div className="form-group">
            <label htmlFor="esicRegistrationNumber">
              ESIC Registration Number
            </label>
            <input
              disabled={!edit}
              className="form-control"
              type="text"
              id="esicRegistrationNumber"
              placeholder="Not Available"
              name="esicRegistrationNumber"
              defaultValue={entry.esicRegistrationNumber}
            />
          </div>
          <label htmlFor="esic_number">Esic Registration File:</label>
              <div>
                <a
                  href={entry.esic_number}
                  style={{
                    display: "block",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    textDecoration: "none",
                    color: "#333",
                    backgroundColor: "#e9ecef",
                  }}
                >
                 Esic Registration Photo Link
                </a>
              </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="projectExperience">
          Details of Project Experience*
        </label>
        <textarea
          disabled={!edit}
          className="form-control"
          type="text"
          rows={5}
          id="projectExperience"
          placeholder="Not Available"
          name="projectExperience"
          defaultValue={entry.projectExperience}
        />
      </div>
      {entry.projectDetails && entry.projectDetails.length > 0 && (
        <div className="mt-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sr. No</th>
                <th scope="col">Customer's Name</th>
                <th scope="col">Project Value</th>
                <th scope="col">Contact Person</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Email ID</th>
              </tr>
            </thead>
            <tbody>
              {entry.projectDetails &&
                entry.projectDetails.map((project, index) => (
                  // <div className="row" style={{justifyContent:"space-around"}}>
                  //   <span >S. No. : {index+1}</span>
                  //   <span >Customer Name : {project.customerName}</span>
                  //   <span  >Project Value : {project.projectValue} </span>
                  //   <span>Contact Person : {project.contactPerson} </span>
                  //   <span >Contact Number : {project.contactNumber} </span>
                  //   <span >Email : {project.email} </span>
                  //   </div>
                  // {tableData.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        disabled={!edit}
                        type="text"
                        className="form-control"
                        defaultValue={index + 1}
                        // onChange={(e) => handleInputChange(index, 'srNo', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        disabled={!edit}
                        type="text"
                        className="form-control"
                        placeholder="Not Available"
                        defaultValue={project.customerName}
                      />
                    </td>
                    <td>
                      <input
                        disabled={!edit}
                        type="text"
                        className="form-control"
                        placeholder="Not Available"
                        defaultValue={project.projectValue}
                      />
                    </td>
                    <td>
                      <input
                        disabled={!edit}
                        type="text"
                        className="form-control"
                        placeholder="Not Available"
                        defaultValue={project.contactPerson}
                      />
                    </td>
                    <td>
                      <input
                        disabled={!edit}
                        type="text"
                        className="form-control"
                        placeholder="Not Available"
                        defaultValue={project.contactNumber}
                      />
                    </td>
                    <td>
                      <input
                        disabled={!edit}
                        type="email"
                        className="form-control"
                        placeholder="Not Available"
                        defaultValue={project.email}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
      <div
        className="row"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <div className="col-md-4">
          <div className="form-group">
            <label htmlFor="copyOfCheque">Copy of the cheque</label>
            <div>
            <input
            disabled={!edit}
                type="file"
                className="form-control-file"
                id="copyOfCheque"
                name="copyOfCheque"
              />
              <a
                href={entry.copyOfCheque}
                style={{
                  display: "block",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#e9ecef",
                }}
              >
                Check Copy Photo Link
              </a>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="attachmentSheet">Separate Sheet</label>
            <div>
            <input
            disabled={!edit}
                type="file"
                className="form-control-file"
                id="attachmentSheet"
                name="attachmentSheet"
              />
              <a
                href={entry.attachmentSheet}
                style={{
                  display: "block",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#e9ecef",
                }}
              >
                Attachment Sheet Link
              </a>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="gstScreenShotPdf">
              Copy of Gst and Pan Verification ScreenShot
            </label>
            <div>
            <input
            disabled={!edit}
                type="file"
                className="form-control-file"
                id="gstScreenShotPdf"
                name="gstScreenShotPdf"
              />
              <a
                href={entry.gstScreenShotPdf}
                style={{
                  display: "block",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#e9ecef",
                }}
              >
               Gst and Pan Verification ScreenShot Link
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="attachmentWOCopies">WO/Agreement/PO Copies</label>
            <div>
            <input
            disabled={!edit}
                type="file"
                className="form-control-file"
                id="attachmentWOCopies"
                name="attachmentWOCopies"
              />
              <a
                href={entry.attachmentWOCopies}
                style={{
                  display: "block",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#e9ecef",
                }}
              >
                Attachment WOCopies Link
              </a>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="attachmentCompletionCertificates">
              Copy of Completion and Certificates for order completed
            </label>
            <div>
            <input
            disabled={!edit}
                type="file"
                className="form-control-file"
                id="attachmentCompletionCertificates"
                name="attachmentCompletionCertificates"
              />
              <a
                href={entry.attachmentCompletionCertificates}
                style={{
                  display: "block",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  textDecoration: "none",
                  color: "#333",
                  backgroundColor: "#e9ecef",
                }}
              >
                Attachment Completion Certificates Link
              </a>
            </div>
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
                  defaultValue={entry.paymentTerms}
                  readOnly={!edit}
                  onChange={(html) => setPaymentTerms(html)}
                  placeholder="Enter Payment Terms"
                  style={{backgroundColor:edit?"transparent":"rgb(233, 236, 239)"}}
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
              isDisabled={!edit}
              options={categoryOption}
              value={selectedCategoryOptions}
              onChange={setSelectedCategoryOptions}
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
              disabled={!edit}
              className="form-control"
              type="text"
              id="enterProjectName"
              placeholder="Enter Project Name"
              defaultValue={entry.projectName}
              name="projectName"
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="category">Category*</label>
            <Select
              isMulti
              name="category"
              isDisabled={!edit}
              options={categoryOptions}
              value={selectedOptions}
              onChange={setSelectedOptions}
            />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="pdfDownload">PDF Download</label>
        <div>
          <a
            href={entry.pdf}
            style={{
              display: "block",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              textDecoration: "none",
              color: "#333",
              backgroundColor: "#e9ecef",
            }}
          >
            PDF Download Link
          </a>
        </div>
        <button  className="btn my-3" disabled={!edit} style={{display:'flex',margin:"auto"}} >Submit</button>
      </div>  
      </form>
    </>
  );
};

export default VendorProfilePart;
