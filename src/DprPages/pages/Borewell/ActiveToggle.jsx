import React, { useEffect, useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

export default function MyToggleComponent({ setChecked, setReason }) {
  const [isChecked, setIsChecked] = useState(false);
  const [nonActiveReason, setNonActiveReason] = useState("");

  useEffect(() => {
    setChecked(isChecked);

    if (!isChecked && nonActiveReason) {
      setReason(nonActiveReason);
    } else if (isChecked) {
      setReason(""); // Clear the reason if the status is active
    }
  }, [isChecked, nonActiveReason]);

  const handleButtonClick = (status) => {
    setIsChecked(status);
    setChecked(status);
  };

  const handleNonActiveReasonChange = (event) => {
    setNonActiveReason(event.target.value);
  };

  return (
    <div
      className="container p-0"
      style={{ alignItems: "center", justifyContent: "center" }}
    >
      <div
        className="d-flex"
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <label>Status </label>
        <div className="d-flex">
          <Form.Check
            type="radio"
            label="Active"
            id="activeRadio"
            checked={isChecked}
            onChange={() => handleButtonClick(true)}
            custom
            style={{ color: "green" , transform: "scale(1.4)", marginRight:"8px"}}
          />
          <Form.Check
            type="radio"
            label="Non-Active"
            id="nonActiveRadio"
            checked={!isChecked}
            onChange={() => handleButtonClick(false)}
            custom
            style={{ color: "red" , transform: "scale(1.4)", marginRight:"8px"}}
          />
        </div>
      </div>
      {!isChecked ? (
        <div>
          <FormControl
            type="text"
            required
            placeholder="Reason for Non-Active"
            value={nonActiveReason}
            onChange={handleNonActiveReasonChange}
          />
        </div>
      ) : null}
    </div>
  );
}
