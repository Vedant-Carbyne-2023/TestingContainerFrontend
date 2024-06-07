import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import { Table } from "react-bootstrap";
import moment from "moment";
import styles from './DprForm.module.css'; // Import the module CSS file
import { Spinner } from "react-bootstrap";


export default function BoundaryWall({ projectName, gpName }) {
  const [vendorName, setVendorName] = useState("");
  const [oldBoundaryWallDprs, setOldBoundaryWallDprs] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingVendorStatus, setLoadingVendorStatus] = useState(true);
  const [isDrillingVendorAllocated, setIsDrillingVendorAllocated] = useState(false);


  let options = [
    { name: "Layout", disabled: false },
    { name: "Excavation", disabled: true },
    { name: "PCC", disabled: true },
    { name: "Brickwork Substructure", disabled: true },
    { name: "Brickwork Superstructure", disabled: true },
    { name: "Plaster work", disabled: true },
    { name: "Painting Work", disabled: true },
  ];

  const [updatedOptions, setUpdatedOptions] = useState([]);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let result = api.post(`/getBoundaryWallDpr`, {
        projectName: projectName,
        gpName: gpName,
      });
      result = await errorHandler(result);
      console.log(result);
      if (result.data.data && result.data.data.vendorName) {
        setVendorName(result.data.data.vendorName);
        setIsDrillingVendorAllocated(!!result.data.data.vendorName);
      } else {
        console.error('Vendor name is null or undefined.');
        setLoading(false);

        alert('No vendor name found. Please allocate a vendor.')
        
      }
      let updated = options.map((option, index) => ({
        ...option,
        disabled:
          index !== 0 &&result.data.data &&
          result.data.data.boundaryWallDpr &&
          !result.data.data.boundaryWallDpr.some(
            (dpr) => option.name == dpr.dprDetails.workDone
          ),
      }));
      

      // Ensure the 0th index option is never disabled
      updated[0].disabled = false;

      setUpdatedOptions(updated);

      const indexOfLastDisabledFalse = updated.reduce(
        (lastIndex, option, currentIndex) => {
          if (!option.disabled) {
            return currentIndex;
          }
          return lastIndex;
        },
        -1
      );

      if (indexOfLastDisabledFalse !== -1) {
        console.log("here");
        // Clone the array to avoid mutating the state directly
        const updatedOptionsCopy = [...updated];
        if (updatedOptionsCopy[indexOfLastDisabledFalse + 1]) {
          updatedOptionsCopy[indexOfLastDisabledFalse + 1].disabled = false;
        }
        setUpdatedOptions(updatedOptionsCopy);
      }

      setOldBoundaryWallDprs(result.data.data && result.data.data.boundaryWallDpr && result.data.data.boundaryWallDpr);
      setLoading(false);
      setLoadingVendorStatus(false); 
    };

    if ((projectName, gpName)) {
      getData();
    }
  }, [projectName, gpName, status]);


  console.log(oldBoundaryWallDprs);

  const [formData, setFormData] = useState("");

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  // useEffect(() => {
  //   if (latestDpr) {

  //     setFormData({...formData,
  //     ['cummulativeWork']:latestDpr.cummulativeWork
  //     })
  //   }
  // }, [latestDpr]);

  // console.log(tableData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    // if(!formData.workDone) return alert('Work Done Not Provided')

    // let total =  await calculateTotalWorkDoneToday()

    if (!formData.labourCount) return alert("Labour Count Not Provided");
    formData.layout = formData.layout === "Yes" ? true : false;
    let result = api.post("/boundaryWallDailyDpr", {
      projectName,
      gpName,
      labourCount: formData.labourCount,
      reason: formData.reason,
      remarks: formData.remarks,
      workDone: formData.workDone,
      workDoneRemarks: formData.workDoneRemarks,
      boundaryWallDate: formData.boundaryWallDate,
      layout: formData.layout,
      excavation: formData.excavation,
    });
    result = await errorHandler(result);
    console.log(result);
    setStatus(result.data.data._id);
    Swal.fire({
      title: result.data.message,
      timer: 5000,
      icon: "success",
    });
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
        <div className={styles.container}>
          <div className={styles.flexContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="vendorName"
                className={styles.formLabel}
              >Vendor Name</label>
              <input
                id="vendorName"
                disabled
                name="vendorName"
                value={vendorName}
              />
            </div>

            <div className={styles.formGroup}>
              <label title="Select Date Of Dpr / Work Done" htmlFor="boundaryWallDate"
                className={styles.formLabel}>Date Of Work</label>
              <input
                name="boundaryWallDate"
                type="date"
                value={formData.boundaryWallDate}
                onChange={(e) => handleChange(e, 'boundaryWallDate')}
              />
            </div>
          </div>

          <div className={styles.flexContainer}>
            <div className={styles.formGroup}>
              <label title="Enter Type Of Work Done" htmlFor="workDone"
                className={styles.formLabel}
              >Work Done</label>
              <select
                id="workDone"
                name="workDone"
                onChange={(e) => handleChange(e, 'workDone')}
                value={formData.workDone}
              >
                <option value="">Select an option</option>
                {updatedOptions.map((option, index) => (
                  <option
                    key={index}
                    value={option.name}
                    disabled={option.disabled}
                  >
                    {option.name}
                  </option>
                ))}
              </select>
              {formData.workDone && (
                <textarea
                  type="text"
                  title="Enter Remarks Related To Work Done"
                  id="workDoneRemarks"
                  name="workDoneRemarks"
                  required
                  value={formData.workDoneRemarks}
                  onChange={(e) => handleChange(e, 'workDoneRemarks')}
                  placeholder={`${formData.workDone} Remarks`}
                />
              )}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel} title="Enter Labour Count" htmlFor="labourCount">Labour Count</label>
              <input
                id="labourCount"
                required
                type="number"
                name="labourCount"
                value={formData.labourCount}
                onChange={(e) => handleChange(e, 'labourCount')}
              />
            </div>

            {formData.labourCount === 0 && (
              <div className={styles.formGroup}>
                <label htmlFor="reason" title="Enter Reason For Having Zero Labour" className={styles.formLabel}>
                  Reason For Labour Count be Zero
                </label>
                <input
                  id="reason"
                  name="reason"
                  required={formData.labourCount === 0}
                  value={formData.reason}
                  onChange={(e) => handleChange(e, 'reason')}
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="remarks"
              title="Enter Remarks"
                className={styles.formLabel}
              >Remarks</label>
              <input
                id="remarks"
                name="remarks"
                value={formData.remarks}
                onChange={(e) => handleChange(e, 'remarks')}
              />
            </div>
          </div>

          <div className="table-container mt-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date Of Filling Form</th>
                <th>Date Of Work</th>
                <th>Type Of User</th>
                <th>Work Done On That Day</th>
                <th>Work Done Remarks</th>
                <th>Labour Count On That Day</th>
                <th>If Labour Count Zero</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {oldBoundaryWallDprs && oldBoundaryWallDprs.length > 0 &&
                oldBoundaryWallDprs.map((dpr, index) => (
                  <tr key={index}>
                    <td>{moment(dpr.dprDetails.createdAt).format('DD/MM/YYYY')}</td>
                    <td>
                      {moment(
                        dpr.dprDetails.boundaryWallDate
                          ? dpr.dprDetails.boundaryWallDate
                          : dpr.dprDetails.todaysDate
                      ).format('DD/MM/YYYY')}
                    </td>
                    <td>{dpr.dprDetails.typeOfUser ? dpr.dprDetails.typeOfUser : 'Employee'}</td>
                    <td>{dpr.dprDetails.workDone}</td>
                    <td>{dpr.dprDetails.workDoneRemarks}</td>
                    <td>{dpr.dprDetails.labourCount}</td>
                    <td>{dpr.dprDetails.reason}</td>
                    <td>{dpr.dprDetails.remarks}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>

          <div className={styles.submitButton}>
            <button className={styles.btnPrimary} type="submit" title="Click To Submit">
              Submit
            </button>
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
