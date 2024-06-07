import React, { useState } from "react";
import styles from "./CheckboxDropdown.module.css";

const CheckboxDropdownForVendors = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (value) => {
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <div>Select Items</div>
        <div>
          <i className="fa fa-caret-down"></i>
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option.name} className={styles.dropdownItem}>
              <div
                className="row"
                style={{ display: "flex", justifyContent: "space-between", alignItems:"center" }}
              >
                <div className="col-md-8">{option.vendorName}</div>
                <div className="col-md-2">
                  <input
                    type="checkbox"
                    value={option._id}
                    checked={selectedOptions.includes(option._id)}
                    onChange={() => handleOptionChange(option._id)}
                  />
                </div>
              </div>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdownForVendors;
