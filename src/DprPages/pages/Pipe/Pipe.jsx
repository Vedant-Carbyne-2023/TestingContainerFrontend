import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import ShowPreviousPipeDpr from "./ShowPreviousPipeDpr";
import PipeDprModal from "./PipeModal";
import { Spinner } from "react-bootstrap";

export default function Pipe({ projectName, gpName }) {
  const [vendorName, setVendorName] = useState("");
  const [scopeOfWork, setScopeOfWork] = useState("");
  const [status, setStatus] = useState("");
  const [loadingVendorStatus, setLoadingVendorStatus] = useState(true);
  const [isDrillingVendorAllocated, setIsDrillingVendorAllocated] =
    useState(false);

  const [formData, setFormData] = useState("");
  const [loading, setLoading] = useState(false);
  const [CummulativeWork, setCummulativeWork] = useState("");

  const handleChange = (e, fieldType) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
  };

  const [tableData, setTableData] = useState([
    { pipeDia: "63", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "75", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "90", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "110", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "125", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "140", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "160", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "180", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    { pipeDia: "200", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
    // Add more initial data as needed
  ]);

  const [previousDprs, setPreviousDprs] = useState("");

  useEffect(() => {
    const getData = async () => {
      console.log("ters")
      setLoading(true);
      setScopeOfWork("0")

      let result = api.post(`/getPipeDpr`, {
        projectName: projectName,
        gpName: gpName,
      });
      result = await errorHandler(result);
      console.log("helllo", result);

      setCummulativeWork(result.data.data.latestDpr.cummulativeWork);
      if (result.data.data.pipeDpr && result.data.data.pipeDpr.vendorName) {
        setIsDrillingVendorAllocated(!!result.data.data.pipeDpr.vendorName);
      }

      if (result.data.data.pipeDpr && result.data.data.pipeDpr.vendorName) {
        setVendorName(result.data.data.pipeDpr.vendorName);
      } else {
        console.error("Vendor name is null or undefined.");
        setLoading(false);

        setTableData([
          { pipeDia: "63", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "75", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "90", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "110", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "125", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "140", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "160", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "180", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          { pipeDia: "200", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
          // Add more initial data as needed
        ])
        setFormData("")
        setVendorName("")
        alert("'No vendor name found. Please allocate a vendor.");
      }
      const setScope = result.data.data.pipeDpr.pipeDia
        ? result.data.data.pipeDpr.pipeDia.reduce((acc, total) => acc + total.scopeOfWork, 0)
        : 0;
      setScopeOfWork(setScope);
      setPreviousDprs(
        result.data.data.pipeDpr ? result.data.data.pipeDpr.pipeDpr : ""
      );

      if (result.data.data.latestDpr && result.data.data.latestDpr.pipeData) {

        let data = [{ pipeDia: "63", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "75", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "90", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "110", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "125", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "140", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "160", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "180", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 },
        { pipeDia: "200", scopeOfWork: 0, workDoneTillDate: 0, workDoneToday: 0 }]

        const newScopeOfWork = data.map((pipe) => {
          const matchingPipe = result.data.data.pipeDpr.pipeDia.find(
            (item) => item.diaOfPipe == pipe.pipeDia
          );
          console.log(matchingPipe);
          return {
            ...pipe,
            scopeOfWork: matchingPipe ? Number(matchingPipe.scopeOfWork) : 0,
          };
        });
        console.log(newScopeOfWork);
        const newTableData = newScopeOfWork.map((pipe) => {
          const matchingPipe = result.data.data.latestDpr.pipeData.find(
            (item) => item.pipeDia == pipe.pipeDia
          );
          return {
            ...pipe,
            // pipeDia: pipe.pipeDia,
            workDoneTillDate: String(
              Number(matchingPipe.workDoneTillDate) +
              Number(matchingPipe.workDoneToday)
            ),
          };
        });
        // console.log(newTableData)
        // console.log(newScopeOfWork)

        setTableData(newTableData);

        setFormData({
          ...formData,
          cummulativeWork: result.data.data.latestDpr.cummulativeWork,
        });
      } else {
        const newScopeOfWork = tableData.map((pipe) => {
          const matchingPipe = result.data.data.pipeDpr && result.data.data.pipeDpr.pipeDia.find(
            (item) => item.diaOfPipe == pipe.pipeDia
          );
          console.log(matchingPipe);
          return {
            ...pipe,
            workDoneTillDate: 0,
            workDoneToday: 0,
            scopeOfWork: matchingPipe ? Number(matchingPipe.scopeOfWork) : 0,
          };
        });

        setTableData(newScopeOfWork);

        setFormData({
          ...formData,
          cummulativeWork: 0,
          workDone: 0,
        });
      }
      setLoading(false);
      setLoadingVendorStatus(false);
    };
    if ((projectName, gpName)) {
      getData();
    }
  }, [projectName, gpName, status]);

  // console.log(tableData)

  const calculateTotalWorkDoneToday = async () => {
    let total = 0;
    for (const data of tableData) {
      if (data.workDoneToday) {
        total += parseInt(data.workDoneToday, 10);
      }
    }
    return total;
  };
  // Function to handle changes in "Work done today" input
  const handleWorkDoneTodayChange = async (index, value) => {
    const updatedFormData = [...tableData];
    updatedFormData[index].workDoneToday = value;

    const totalWorkDone = Number(value) + Number(updatedFormData[index].workDoneTillDate);
    if (totalWorkDone > updatedFormData[index].scopeOfWork) {
      // Show alert and don't update the state
      alert("Work done today + Work done till date cannot exceed Scope of Work!");
      return;
    }

    setTableData(updatedFormData);
    let total = await calculateTotalWorkDoneToday();
    console.log(total);
    setFormData({ ...formData, ["workDone"]: parseInt(total) });

    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if(!formData.workDone) return alert('Work Done Not Provided')

    let total = await calculateTotalWorkDoneToday();
    console.log(total);

    if (!formData.labourCount) return alert("Labour Count Not Provided");

    let result = api.post("/pipeDailyDpr", {
      projectName,
      gpName,
      totalWorkDone: total,
      labourCount: formData.labourCount,
      reason: formData.reason,
      remarks: formData.remarks,
      tableData,
      cummulativeWork: formData.cummulativeWork,
      todaysDate: formData.todaysDate,
    });
    result = await errorHandler(result);
    // setStatus(result.data.data._id)
    console.log(result);
    setTableData([]);
    setFormData("");
    setScopeOfWork("")
    setStatus(result.data.data._id);
    Swal.fire({
      title: result.data.message,
      timer: 5000,
      icon: "success",
    });
  };

  console.log(formData.labourCount);

  return (
    <>
      {loadingVendorStatus ? (
        // Show loading spinner or message while checking vendor status
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (
        <>
          {isDrillingVendorAllocated && (
            <>
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "100vh" }}
                >
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              ) : (
                ""
              )}
              <form onSubmit={handleSubmit}>
                <div className="container mt-2">
                  <div className="row d-flex justify-content-around">
                    <div className="col-md-4">
                      <label htmlFor="vendorName">Vendor Name</label>
                      <input
                        className="form-control"
                        id="vendorName"
                        disabled
                        name="vendorName"
                        value={vendorName}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="scopeOfWork">Scope Of Work</label>
                      <input
                        className="form-control"
                        id="scopeOfWork"
                        disabled
                        name="scopeOfWork"
                        value={scopeOfWork + " RMT"}
                      //   onChange={(e) => handleChange(e, "scopeOfWork")}
                      />
                    </div>

                    <div className="col-md-4">
                      <label htmlFor="cummulativeWork">Cummulative Work</label>
                      <input
                        className="form-control"
                        disabled
                        type="tel"
                        id="cummulativeWork"
                        name="cummulativeWork"
                        value={
                          CummulativeWork +
                          " RMT"
                        }
                        onChange={(e) => handleChange(e, "cummulativeWork")}
                      />
                    </div>
                  </div>

                  <div className="mx-auto mt-4">
                    {previousDprs && (
                      <PipeDprModal previousPipeDpr={previousDprs} />
                    )}
                  </div>

                  <div className="col-md-4">
                    <label
                      htmlFor="todaysDate"
                      title="Select Date Of Dpr Filling"
                    >
                      Date Of Dpr
                    </label>
                    <input
                      name="todaysDate"
                      type="date"
                      required
                      className="form-control"
                      value={formData.todaysDate}
                      onChange={(e) => handleChange(e, "todaysDate")}
                    />
                  </div>

                  <div
                    className="row mt-5"
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                      flexDirection: "row",
                    }}
                  >
                    <div className="col-md-12">
                      <div className="table-container" style={{ maxHeight: '700px', overflowY: 'auto' }}>
                        <table className="table" style={{ width: '100%' }}>
                          <thead>
                            <tr>
                              <th style={{ minWidth: '100px' }}>Pipe Dia</th>
                              <th style={{ minWidth: '100px' }}>Scope Of Work</th>
                              <th style={{ minWidth: '100px' }}>Work done till date</th>
                              <th style={{ minWidth: '100px' }}>Unit</th>
                              <th style={{ minWidth: '100px' }}>Work done today</th>
                              <th style={{ minWidth: '100px' }}>Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tableData.map((data, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={data.pipeDia}
                                    readOnly
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    value={data.scopeOfWork}
                                    readOnly
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={data.workDoneTillDate}
                                    readOnly
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    required
                                    className="form-control"
                                    value={"RMT"}
                                    readOnly
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="tel"
                                    className="form-control"
                                    value={
                                      data.workDoneToday !== 0
                                        ? data.workDoneToday
                                        : ""
                                    }
                                    onChange={(e) =>
                                      handleWorkDoneTodayChange(
                                        index,
                                        parseInt(e.target.value) || 0
                                      )
                                    }
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={"RMT"}
                                    readOnly
                                    disabled
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">

                        <div className="row">
                          <label
                            htmlFor="ccDismantling"
                            title="Enter Labour Count Of The Day"
                          >
                            C. C. Dismantling
                          </label>
                          <input
                            className="form-control"
                            id="ccDismantling"
                            required
                            type="tel"
                            name="ccDismantling"
                            value={formData.ccDismantling}
                            onChange={(e) => handleChange(e, "ccDismantling")}
                          />
                        </div>

                      </div>
                      <div className="col-md-6">
                        <div className="row">
                          <label
                            htmlFor="pipeLaying"
                            title="Enter Laying"
                          >
                            Laying
                          </label>
                          <input
                            className="form-control"
                            id="pipeLaying"
                            required
                            type="tel"
                            name="pipeLaying"
                            value={formData.pipeLaying}
                            onChange={(e) => handleChange(e, "pipeLaying")}
                          />
                        </div>
                      </div>
                    </div>

                    <div
                      className="row"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div className="col-md-6">
                        <div className="row">
                          <label
                            htmlFor="labourCount"
                            title="Enter Labour Count Of The Day"
                          >
                            Labour Count
                          </label>
                          <input
                            className="form-control"
                            id="labourCount"
                            required
                            type="tel"
                            name="labourCount"
                            value={formData.labourCount}
                            onChange={(e) => handleChange(e, "labourCount")}
                          />
                        </div>
                        {formData.labourCount == 0 && (
                          <div className="row">
                            <label
                              htmlFor="reason"
                              className="form-label"
                              title="Enter Reason For Labour Count Be 0"
                            >
                              Reason For Labour Count be Zero
                            </label>
                            <input
                              className="form-control"
                              id="reason"
                              name="reason"
                              required={formData.labourCount == 0}
                              value={formData.reason}
                              onChange={(e) => handleChange(e, "reason")}
                            />
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <label htmlFor="remarks" title="Enter Remarks">
                          Remarks
                        </label>
                        <input
                          className="form-control"
                          id="remarks"
                          // required
                          name="remarks"
                          value={formData.remarks}
                          onChange={(e) => handleChange(e, "remarks")}
                        />
                      </div>
                    </div>
                    <div
                      className="col mt-3 d-flex"
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <label className="p-0">Total Work Done Today</label>
                        <input
                          value={formData.workDone}
                          style={{ textAlign: "end", width: "7rem" }}
                          className="mx-2 form-control"
                          disabled={true}
                        />
                      </div>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <label
                          className="p-0"
                          title="Labour Efficiency = Total Work / Total Labour Today"
                        >
                          Per Labour Efficiency
                        </label>
                        <input
                          value={
                            (formData.workDone / formData.labourCount).toFixed(
                              2
                            ) + " RMT"
                          }
                          step={2}
                          style={{ textAlign: "end", width: "7rem" }}
                          className="mx-2 form-control"
                          disabled={true}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary mt-3"
                    type="submit"
                    title="Click To Submit"
                  >
                    Submit
                  </button>
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
      )}
    </>
  );
}
