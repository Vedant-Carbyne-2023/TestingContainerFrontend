import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import { Table } from "react-bootstrap";
import moment from "moment";
import { Spinner } from "react-bootstrap";


export default function Fhtc({ projectName, gpName }) {
  const [formData, setFormData] = useState("");
  const [currentDate, setCurrentDate] = useState(moment().format("DD-MM-YYYY"));


  const [status, setStatus] = useState('false')
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [allFhtcDprs, setAllFhtcDprs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingVendorStatus, setLoadingVendorStatus] = useState(true);
  const [isDrillingVendorAllocated, setIsDrillingVendorAllocated] = useState(false);
  const [cummulativeWork, setCummulativeWork] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let result = api.post(`/getFhtcDpr`, {
        projectName: projectName,
        gpName: gpName,
      });
      result = await errorHandler(result);

      const lastDpr = result.data.data.fhtcDpr[result.data.data.fhtcDpr.length - 1];
      const lastCummulativeWork = lastDpr.dprDetails.cummulativeWork;

      console.log(result);
      setCummulativeWork(lastCummulativeWork);
      if (result.data.data && result.data.data.vendorName) {
        setIsDrillingVendorAllocated(!!result.data.data.vendorName);
      }
      if (result.data.data && result.data.data.vendorName) {
        setVendorName(result.data.data.vendorName);
      } else {
        console.error('Vendor name is null or undefined.');
        setLoading(false);

        alert('No vendor name found. Please allocate a vendor.')

      }

      setScopeOfWork(result.data.data && result.data.data.scopeOfWork);
      if (result.data.data && result.data.data.fhtcDpr.length > 0) {
        console.log(
          result.data.data.fhtcDpr[result.data.data.fhtcDpr.length - 1]
            .dprDetails.cummulativeWork
        );

        setAllFhtcDprs(result.data.data && result.data.data.fhtcDpr);
        setFormData({
          ...formData,
          ["cummulativeWork"]:
            result.data.data.fhtcDpr[result.data.data.fhtcDpr.length - 1]
              .dprDetails.cummulativeWork,
        });
      }
      setLoading(false);
      setLoadingVendorStatus(false);

    };
    if ((projectName, gpName)) {
      getData();
    }
  }, [projectName, gpName, status]);

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  // console.log(tableData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if(!formData.workDone) return alert('Work Done Not Provided')

    // let total =  await calculateTotalWorkDoneToday()
    // console.log(total)

    if (!formData.labourCount) return alert("Labour Count Not Provided");

    let result = api.post("/fhtcDailyDpr", {
      projectName,
      gpName,
      labourCount: formData.labourCount,
      reason: formData.reason,
      remarks: formData.remarks,
      workDone: formData.workDone,
      fhtcDate: formData.fhtcDate,
      cummulativeWork: formData.cummulativeWork,
    });
    result = await errorHandler(result);
    console.log(result);
    setStatus(result.data.data._id)
    Swal.fire({
      title: result.data.message,
      timer: 5000,
      icon: "success",
    });
  };

  console.log(formData.labourCount);
  const tableCellStyle = {
    padding: "8px",
    textAlign: "left",
    borderBottom: "1px solid #000", // Horizontal border
    borderRight: "1px solid #000",
    borderLeft: "1px solid #000", // Vertical border
    borderTop: "1px solid #000", // Vertical border
  };

  return (
    <>
      {loadingVendorStatus ? (
        // Show loading spinner or message while checking vendor status
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <>
          {isDrillingVendorAllocated && (

            <>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit}>
                {/* <hr style={{ width: "100%", border: "1px solid #000" }} /> */}

                <div className="container mt-4">
                  <div className="row">
                    <div className="col-md-4">
                      <label for="vendorName" style={{ marginRight: "16px" }}>Vendor Name</label>
                      <input
                        id="vendorName"
                        disabled
                        name="vendorName"
                        value={vendorName}
                      />
                    </div>

                    <div className="col-md-4">
                      <label for="scopeOfWork" style={{ marginRight: "16px" }}>Scope Of Work </label>
                      <input
                        id="scopeOfWork"
                        disabled
                        name="scopeOfWork"
                        value={scopeOfWork}
                      />
                    </div>

                    <div className="col-md-4">
                      <label for="cummulativeWork" style={{ marginRight: "12px" }}>Cummulative Work</label>
                      <input
                        disabled
                        type="number"
                        id="cummulativeWork"
                        name="cummulativeWork"
                        value={cummulativeWork || 0}
                        onChange={(e) => handleChange(e, "cummulativeWork")}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label style={{ marginRight: "16px" }}>Today's Date:</label>
                      <input
                        type="text"
                        value={currentDate}
                        disabled
                      />
                    </div>


                    <div className="col-md-4">
                      <label for="fhtcDate" title="Select Date Of Dpr" style={{ marginRight: "26px" }}>Date Of Work</label>
                      <input
                        name="fhtcDate"
                        type="date"
                        value={formData.fhtcDate}
                        onChange={(e) => handleChange(e, "fhtcDate")}
                      />
                    </div>

                    <div className="col-md-4">
                      <label for="workDone" title="Enter Today's Work Done" style={{ marginRight: "72px" }}>Work Done</label>
                      <input
                        id="workDone"
                        required
                        type="number"
                        name="workDone"
                        value={formData.workDone}
                        onChange={(e) => handleChange(e, "workDone")}
                      />
                    </div>


                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <label for="labourCount" title="Enter Today's Labour Count" style={{ marginRight: "16px" }}>Labour Count</label>
                      <input
                        id="labourCount"
                        required
                        type="number"
                        name="labourCount"
                        value={formData.labourCount}
                        onChange={(e) => handleChange(e, "labourCount")}
                      />
                      {formData.labourCount == 0 && (
                        <div>
                          <label for="reason" title="Enter Remarks" style={{ marginRight: "16px" }}>Reason For Labour Count be Zero</label>
                          <input
                            id="reason"
                            name="reason"
                            required={formData.labourCount == 0}
                            value={formData.reason}
                            onChange={(e) => handleChange(e, "reason")}
                          />
                        </div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label for="remarks" style={{ marginRight: "62px" }}>Remarks</label>
                      <input
                        id="remarks"
                        name="remarks"
                        value={formData.remarks}
                        onChange={(e) => handleChange(e, "remarks")}
                      />
                    </div>
                  </div>

                  <div style={{ textAlign: "center", marginTop: "10px" }}>
                    <button
                      title="Click To Submit"
                      type="submit"
                      style={{
                        padding: "10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "1px solid #007bff",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  
                  <div className="table-container mt-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead style={{ backgroundColor: "rgb(172 199 229)", color: "Black" }}>
                      <tr>
                        <th style={tableCellStyle}>Date Of Filling Form</th>
                        <th style={tableCellStyle}>Date Of Dpr</th>
                        <th style={tableCellStyle}>Type Of User</th>
                        <th style={tableCellStyle}>Work Done On That Day</th>
                        <th style={tableCellStyle}>Cummulative Till That Day</th>
                        <th style={tableCellStyle}>Labour Count On That Day</th>
                        <th style={tableCellStyle}>If Labout Count Zero</th>
                        <th style={tableCellStyle}>Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allFhtcDprs.length > 0 &&
                        allFhtcDprs.map((dpr, index) => (
                          <tr key={index}>
                            <td style={tableCellStyle}>
                              {moment(dpr.dprDetails.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td style={tableCellStyle}>
                              {moment(
                                dpr.dprDetails.fhtcDate
                                  ? dpr.dprDetails.fhtcDate
                                  : dpr.dprDetails.todaysDate
                              ).format("DD/MM/YYYY")}
                            </td>
                            <td style={tableCellStyle}>{dpr.dprDetails.typeOfUser}</td>
                            <td style={tableCellStyle}>{dpr.dprDetails.workDone}</td>
                            <td style={tableCellStyle}>{dpr.dprDetails.cummulativeWork}</td>
                            <td style={tableCellStyle}>{dpr.dprDetails.labourCount}</td>
                            <td style={tableCellStyle}>{dpr.dprDetails.reason}</td>
                            <td style={tableCellStyle}>{dpr.dprDetails.remarks}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                </div>
              </form>
            </>
          )}
          {!isDrillingVendorAllocated && (
            <div className="alert alert-warning mt-3">
              No drilling vendor allocated. Please allocate a vendor first.
            </div>
          )}

        </>
      )
      }
    </>


  );
}


