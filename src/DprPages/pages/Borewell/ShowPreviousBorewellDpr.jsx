import moment from "moment";
import React from "react";

export default function ShowPreviousBorewellDpr({ previousDprs }) {
  console.log(previousDprs);

  return (
    <div>
      {previousDprs && (
        <table className="table table-bordered" style={{ width: "100%", border: "1px solid #000" }}>
        <thead className="thead-dark" style={{  backgroundColor: "rgb(172 199 229)", color: "#fff" }}>
          <tr>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Dpr Date</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>BoreWell Number</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Type Of User</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Drilling</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Drilling Depth</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Lowering</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Lowering Depth</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Gravelling</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Gravelling Packaging Qty</th>
            <th colSpan="3" style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Compressor Unit</th>
            <th colSpan="3" style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Op Unit</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Remarks</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Status</th>
            <th style={{ border: "1px solid #000", padding: "8px", backgroundColor: "rgb(172 199 229)" }}>Dpm Remarks</th>
          </tr>
          <tr>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Status</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Start Time</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>End Time</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Status</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>Start Time</th>
            <th style={{ border: "1px solid #000", padding: "8px" , backgroundColor: "rgb(172 199 229)"}}>End Time</th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
            <th style={{ border: "1px solid #000", padding: "8px" }}></th>
          </tr>
        </thead>
        <tbody>
          {previousDprs && previousDprs.map((dpr, index) => (
            <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {moment(
                  dpr.dprDetails.todaysDate ? dpr.dprDetails.todaysDate : ""
                ).format("DD-MM-YYYY")}
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {dpr.dprDetails.borewellCount
                  ? dpr.dprDetails.borewellCount
                  : "1"}
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {dpr.dprDetails.typeOfUser
                  ? dpr.dprDetails.typeOfUser
                  : "Employee"}
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {dpr.dprDetails.drillingDates && (
                  <>
                    {dpr.dprDetails?.drillingDates[
                      dpr.dprDetails?.drillingDates.length - 1
                    ]?.typeOfDate === "Start Date" ? (
                      <>
                        Started <br />
                        {moment(
                          dpr.dprDetails?.drillingDates[
                            dpr.dprDetails?.drillingDates.length - 1
                          ]?.workingDate
                        ).format("DD-MM-YYYY")}
                      </>
                    ) : dpr.dprDetails?.drillingDates[
                      dpr.dprDetails?.drillingDates.length - 1
                    ]?.typeOfDate === "End Date" ? (
                      <>
                        Completed <br />
                        {moment(
                          dpr.dprDetails?.drillingDates[
                            dpr.dprDetails?.drillingDates.length - 1
                          ]?.workingDate
                        ).format("DD-MM-YYYY")}
                      </>
                    ) : (
                      <>
                        Running <br />
                        {moment(
                          dpr.dprDetails?.drillingDates[
                            dpr.dprDetails?.drillingDates.length - 1
                          ]?.workingDate
                        ).format("DD-MM-YYYY")}
                      </>
                    )}
                  </>
                )}
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>
                {
                    dpr.dprDetails?.drillingDates[
                      dpr.dprDetails?.drillingDates.length - 1
                    ]?.drillingDepth
                }
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{dpr.dprDetails?.loweringDate ?
                <>
                  Completed <br />
                  {moment(dpr.dprDetails.loweringDate).format('DD-MM-YYYY')}
                </>
                : "-"}</td>
                <td style={{ border: "1px solid #000", padding: "8px" }}>
                {
                    dpr.dprDetails?.loweringDepth
                }
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{dpr.dprDetails?.gravellingDate ?
                <>
                  Completed <br />
                  {moment(dpr.dprDetails.gravellingDate).format('DD-MM-YYYY')}
                </>
                : "-"}</td>
         <td style={{ border: "1px solid #000", padding: "8px" }}>
                {
                    dpr.dprDetails?.gravelPackagingQty
                }
              </td>
              <td colSpan="3" style={{ border: "1px solid #000", padding: "8px" }}>
                <table style={{ width: "100%", border: "1px solid #000" }}>
                  <tbody>
                    {dpr.dprDetails.compressorDates.map((dates, diaIndex) => (
                      <tr key={diaIndex}>
                        <td style={{ border: "1px solid #000", padding: "8px" }}>
                          {dates.typeOfDate &&
                            dates.typeOfDate == "Start Date" ?
      
                            <>
                              Started <br />
                              {moment(
                                dpr.dprDetails.compressorDates[
                                  dpr.dprDetails.compressorDates.length - 1
                                ]?.workingDate
                              ).format("DD-MM-YYYY")}
                            </>
      
                            : dates.typeOfDate == "End Date" ?
      
                              <>
                                Completed <br />
                                {moment(
                                  dpr.dprDetails.compressorDates[
                                    dpr.dprDetails.compressorDates.length - 1
                                  ]?.workingDate
                                ).format("DD-MM-YYYY")}
                              </>
      
      
                              :
      
                              <>
                                Running <br />
                                {moment(
                                  dpr.dprDetails.compressorDates[
                                    dpr.dprDetails.compressorDates.length - 1
                                  ]?.workingDate
                                ).format("DD-MM-YYYY")}
                              </>
                          }
                        </td>
                        <td style={{ border: "1px solid #000", padding: "8px" }}>
                          {dates.timeGap &&
                            dates.timeGap.map((time) => (
                              <div style={{ border: "1px solid #000", padding: "8px", margin: "0" }}>
                                {moment(time.startTime).format("h:mm A")}
                              </div>
                            ))}
                        </td>
                        <td style={{ border: "1px solid #000", padding: "8px" }}>
                          {dates.timeGap &&
                            dates.timeGap.map((time) => (
                              <div style={{ border: "1px solid #000", padding: "8px", margin: "0" }}>
                                {moment(time.endTime).format("h:mm A")}
                              </div>
                            ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td colSpan="3" style={{ border: "1px solid #000", padding: "8px" }}>
                <table style={{ width: "100%", border: "1px solid #000" }}>
                  <tbody>
                    {dpr.dprDetails.opUnitDates.map((dates, diaIndex) => (
                      <tr key={diaIndex}>
                        <td style={{ border: "1px solid #000", padding: "8px" }}>
                          {dates.typeOfDate &&
                            dates.typeOfDate == "Start Date" ?
      
                            <>
                              Started <br />
                              {moment(
                                dpr.dprDetails.opUnitDates[
                                  dpr.dprDetails.opUnitDates.length - 1
                                ]?.workingDate
                              ).format("DD-MM-YYYY")}
                            </>
      
                            : dates.typeOfDate == "End Date" ?
      
                              <>
                                Completed <br />
                                {moment(
                                  dpr.dprDetails.opUnitDates[
                                    dpr.dprDetails.opUnitDates.length - 1
                                  ]?.workingDate
                                ).format("DD-MM-YYYY")}
                              </>
      
      
                              :
      
                              <>
                                Running <br />
                                {moment(
                                  dpr.dprDetails.opUnitDates[
                                    dpr.dprDetails.opUnitDates.length - 1
                                  ]?.workingDate
                                ).format("DD-MM-YYYY")}
                              </>
                          }
                        </td>
                        <td style={{ border: "1px solid #000", padding: "8px" }}>
                          {dates.timeGap &&
                            dates.timeGap.map((time) => (
                              <div style={{ border: "1px solid #000", padding: "8px", margin: "0" }}>
                                {moment(time.endTime).format("h:mm A")}
                              </div>
                            ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{dpr.dprDetails.remarks}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{dpr.dprDetails.status}</td>
              <td style={{ border: "1px solid #000", padding: "8px" }}>{dpr.dprDetails.dpmRemarks}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      )}
    </div>
  );
}
