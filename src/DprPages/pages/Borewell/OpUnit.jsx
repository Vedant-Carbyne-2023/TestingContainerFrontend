import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import moment from "moment";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import MyToggleComponent from "./ActiveToggle";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import Swal from "sweetalert2";
import Clock from "../../functions/Clock";

const OpUnit = forwardRef(
  (
    {
      latestDpr,

      opUnitVendorName,
    },
    ref
  ) => {
    const [formData, setFormData] = useState({
      opUnitDate: "",
      startTime: "",
      endTime: "",
    });

    const [isEndOpUnitDate, setIsEndOpUnitDate] = useState(false);
    const [activeOpUnit, setActiveOpUnit] = useState(false);
    const [nonActiveReason, setNonActiveReason] = useState("");
    const [opUnitDates, setOpUnitDates] = useState([]);
    const [ifLastOpUnitDate, setIfLastOpUnitDate] = useState(false);
    const [timeGap, setTimeGaps] = useState([]);

    useEffect(() => {
      if (latestDpr && latestDpr.opUnitDates) {
        setOpUnitDates(latestDpr.opUnitDates);
        setIfLastOpUnitDate(
          latestDpr.opUnitDates.slice(-1)[0]?.typeOfDate === "End Date"
        );
      }
    }, [latestDpr]);

    const handleChange = (e, fieldType) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleAddTimeGap = () => {
      const { opUnitDate, startTime, endTime } = formData;
      if (opUnitDate && startTime && endTime) {
        const startDateTime = moment(
          `${opUnitDate} ${startTime}`,
          "YYYY-MM-DD h:mm a"
        ).utcOffset(0);
        const endDateTime = moment(
          `${opUnitDate} ${endTime}`,
          "YYYY-MM-DD h:mm a"
        ).utcOffset(0);
        // console.log(startDateTime, endDateTime)

        if (
          startDateTime.isValid() &&
          endDateTime.isValid() &&
          endDateTime.isAfter(startDateTime)
        ) {
          setTimeGaps((prevTimeGaps) => [
            ...prevTimeGaps,
            {
              startTime: startDateTime.format("YYYY-MM-DD h:mm a"),
              endTime: endDateTime.format("YYYY-MM-DD h:mm a"),
            },
          ]);
          setFormData((prevData) => ({
            ...prevData,
            startTime: "",
            endTime: "",
          }));
        } else {
          // Handle invalid date/time input
          Swal.fire({
            title: "Invalid Date/Time Input",
            text: "Please make sure the start time is before the end time and both are valid.",
            icon: "error",
          });
        }
      } else {
        // Handle missing date/time input
        Swal.fire({
          title: "Missing Date/Time Input",
          text: "Please enter both start time and end time.",
          icon: "error",
        });
      }
    };

    const handleRemoveTimeGap = (index) => {
      setTimeGaps((prevTimeGaps) => prevTimeGaps.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!formData.opUnitDate) {
        // Display an error message or handle the validation error
        Swal.fire({
          icon: "error",
          title: "Op Unit Date",
          text: "Op Unit Date is required",
        });
        return "cancel"; // Form is not valid
      }

      const startDate = opUnitDates.length === 0;

      const newDate = {
        workingDate: formData.opUnitDate,
        typeOfDate: startDate
          ? "Start Date"
          : isEndOpUnitDate
          ? "End Date"
          : "Regular Date",
        status: activeOpUnit
          ? "Active"
          : isEndOpUnitDate
          ? "OpUnit Was Ended"
          : "Non Active",
        reason: activeOpUnit ? "" : nonActiveReason,
        timeGap: activeOpUnit ? timeGap : [],
      };

      let allDates = opUnitDates;
      allDates.push(newDate);

      // console.log(allDates)
      setFormData({ opUnitDate: "", startTime: "", endTime: "" });
      setActiveOpUnit(false);
      setNonActiveReason("");
      setIsEndOpUnitDate(false);
      setTimeGaps([]);
      if (newDate.status === "OpUnit Was Ended") {
        // Delay the alert by 3 seconds
        setTimeout(() => {
          // Show an alert and return without submitting
          Swal.fire({
            title: "OpUnit Was Ended",
            text: "OpUnit Was Ended. Please Select PumpHouse From Type of Work and Start Filling Entry in PumpHouse.",
            icon: "info",
          });
        }, 4000);
      }
      return allDates;
      // return
    };
    useImperativeHandle(ref, () => ({
      handleSubmit,
    }));
    return (
      <form onSubmit={handleSubmit}>
        <Container className="mt-3">
          <Row className="d-flex justify-content-around align-items-center">
            <h4>OpUnit</h4>
            <Col md={3}>
              <Form.Label htmlFor="opUnitVendorName">
                OpUnit Vendor Name
              </Form.Label>
              <Form.Control
                id="opUnitVendorName"
                disabled
                value={opUnitVendorName}
              />
            </Col>
          </Row>
          <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>

          {opUnitDates.length > 0 && (
            <Table
              striped
              bordered
              hover
              className="mt-3"
              style={{ border: "1px solid #000", marginTop: "30px" }}
            >
              <thead style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <tr>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Type Of Date
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Status On That Date
                  </th>
                  <th
                    colSpan={3}
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Time Gap
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Reason For Non Active
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={1}
                    style={{ border: "1px solid #000", padding: "8px" }}
                  ></th>
                  <th
                    colSpan={1}
                    style={{ border: "1px solid #000", padding: "8px" }}
                  ></th>
                  <th
                    colSpan={1}
                    style={{ border: "1px solid #000", padding: "8px" }}
                  ></th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Start Time
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    End Time
                  </th>
                  <th
                    style={{
                      border: "1px solid #000",
                      padding: "8px",
                      backgroundColor: "rgb(172 199 229)",
                    }}
                  >
                    Total Time
                  </th>
                  <th
                    colSpan={1}
                    style={{ border: "1px solid #000", padding: "8px" }}
                  ></th>
                </tr>
              </thead>
              <tbody>
                {opUnitDates.map((opUnitDate, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {opUnitDate.typeOfDate}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {moment(opUnitDate.workingDate).format("DD/MM/YYYY")}
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {opUnitDate.status}
                    </td>
                    <td
                      colSpan={1}
                      style={{ border: "1px solid #000", padding: "8px" }}
                    >
                      {opUnitDate.timeGap.map((dates, idx) => (
                        <div key={idx}>
                          <p style={{ margin: 0 }}>
                            {moment(new Date(dates.startTime)).format("h:mm a")}
                          </p>
                        </div>
                      ))}
                    </td>
                    <td
                      colSpan={1}
                      style={{ border: "1px solid #000", padding: "8px" }}
                    >
                      {opUnitDate.timeGap.map((dates, idx) => (
                        <div key={idx}>
                          <p style={{ margin: 0 }}>
                            {moment(dates.endTime).format("h:mm a")}
                          </p>
                        </div>
                      ))}
                    </td>
                    <td
                      colSpan={1}
                      style={{ border: "1px solid #000", padding: "8px" }}
                    >
                      {Number(
                        (
                          opUnitDate.timeGap.reduce(
                            (total, dates) =>
                              total +
                              new Date(dates.endTime).getTime() -
                              new Date(dates.startTime).getTime(),
                            0
                          ) /
                          (1000 * 60 * 60)
                        ).toFixed(2)
                      )}{" "}
                      hours
                    </td>
                    <td style={{ border: "1px solid #000", padding: "8px" }}>
                      {opUnitDate.status === "Non Active"
                        ? opUnitDate.reason
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          </div>

          {ifLastOpUnitDate && <p>OpUnit Was Ended</p>}

          {!ifLastOpUnitDate && opUnitDates.length > 0 && (
            <>
              <Row className="mt-3">
                <Col md={3}>
                  <Form.Label title="If OpUnit Is Complete Today Press This Button">
                    If End Of OpUnit Press The End Button{" "}
                  </Form.Label>
                  <Form.Check
                    type="radio"
                    label="OpUnit End Date"
                    id="opUnitEndDateRadio"
                    checked={isEndOpUnitDate}
                    onChange={() => setIsEndOpUnitDate(!isEndOpUnitDate)}
                  />
                </Col>

                <Col md={3}>
                  <Form.Label
                    title="Select Date Of Op Unit Work"
                    htmlFor="opUnitDate"
                  >
                    OpUnit Date
                  </Form.Label>
                  <Form.Control
                    id="opUnitDate"
                    type="date"
                    required
                    disabled={ifLastOpUnitDate}
                    name="opUnitDate"
                    value={formData.opUnitDate}
                    onChange={(e) => handleChange(e, "opUnitDate")}
                  />
                </Col>

                <Col md={3}>
                  <MyToggleComponent
                    setChecked={(check) => setActiveOpUnit(check)}
                    setReason={(reason) => setNonActiveReason(reason)}
                  />
                </Col>
              </Row>
            </>
          )}

          {opUnitDates.length < 1 && (
            <Row className="mt-3">
              <Col md={3}>
                <Form.Label
                  htmlFor="opUnitDate"
                  title="Select Start Date Of OpUnit"
                >
                  OpUnit Start Date
                </Form.Label>
                <Form.Control
                  id="opUnitDate"
                  required
                  type="date"
                  name="opUnitDate"
                  value={formData.opUnitDate}
                  onChange={(e) => handleChange(e, "opUnitDate")}
                />
              </Col>
              <Col md={3}>
                <MyToggleComponent
                  setChecked={(check) => setActiveOpUnit(check)}
                  setReason={(reason) => setNonActiveReason(reason)}
                />
              </Col>
            </Row>
          )}

          {activeOpUnit && (
            <Row className="mt-3">
              <Col md={5}>
                <Form.Label title="Select Start Time Of OpUnit">
                  Start Time
                </Form.Label>
                <Clock
                  setTimePeriod={(time) =>
                    setFormData({ ...formData, startTime: time })
                  }
                />
              </Col>
              <Col md={5}>
                <Form.Label title="Select End Time Of OpUnit">
                  End Time
                </Form.Label>
                <Clock
                  setTimePeriod={(time) =>
                    setFormData({ ...formData, endTime: time })
                  }
                />
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button
                  variant="primary"
                  onClick={handleAddTimeGap}
                  title="Add Time Gap Of Work In OpUnit"
                >
                  Add Time Gap
                </Button>
              </Col>
            </Row>
          )}

          {timeGap.length > 0 && (
            <Row className="mt-3">
              <Col md={6}>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Total Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeGap.map((gap, index) => (
                      <tr key={index}>
                        <td>
                          {moment(new Date(gap.startTime))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("YYYY-MM-DD h:mm a")}
                        </td>
                        <td>
                          {moment(new Date(gap.endTime))
                            .add(5, "hours")
                            .add(30, "minutes")
                            .format("YYYY-MM-DD h:mm a")}
                        </td>
                        <td>
                          {gap.startTime && gap.endTime
                            ? (
                                (new Date(gap.endTime).getTime() -
                                  new Date(gap.startTime).getTime()) /
                                (1000 * 60 * 60)
                              ).toFixed(2) + " hrs"
                            : "Invalid date values"}
                        </td>
                        <td>
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveTimeGap(index)}
                          >
                            Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          )}
        </Container>
      </form>
    );
  }
);
export default OpUnit;
