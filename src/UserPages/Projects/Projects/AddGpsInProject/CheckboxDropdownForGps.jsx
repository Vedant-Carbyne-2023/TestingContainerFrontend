import React, { useState } from 'react';
import styles from './CheckboxDropdown.module.css';

const CheckboxDropdownForGps = ({ options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    const updatedOptions = selectedOptions.some((selectedOption) => selectedOption._id === option._id)
      ? selectedOptions.filter((selectedOption) => selectedOption._id !== option._id)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onChange(updatedOptions);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropdownToggle} onClick={toggleDropdown}>
        <div>Select GP</div>
        <div><i className='fa fa-caret-down'></i></div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option._id} className={styles.dropdownItem}>
              <div className='row'>
                <div className='col-md-5'>
                  {option.name}
                </div>
                <div className='col-md-2'>
                  <input
                    type="checkbox"
                    value={option.name}
                    checked={selectedOptions.some((selectedOption) => selectedOption._id === option._id)}
                    onChange={() => handleOptionChange(option)}
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

export default CheckboxDropdownForGps;
