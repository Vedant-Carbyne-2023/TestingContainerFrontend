import React, { useState } from 'react';
import styles from './CheckboxDropdown.module.css';

const CheckboxDropdown = ({ options, onChange }) => {
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
        <div>Select Members</div>
        <div><i className='fa fa-caret-down'></i></div>
      </div>

      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map((option) => (
            <label key={option.id} className={styles.dropdownItem}>
           
              <div className='row'>
                <div className='col-md-5'>
              {option.name}
              </div>
              <div className='col-md-5'>
              {option.role}
              </div>
              <div className='col-md-2'>
              <input
                type="checkbox"
                
                value={option.id}
                checked={selectedOptions.includes(option.id)}
                onChange={() => handleOptionChange(option.id)}
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

export default CheckboxDropdown;
