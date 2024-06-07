import React, { useState, useRef, useEffect } from "react";

import styles from './Search.module.css'


const SearchInputVendor = ({
  placeholder,
  id,
  title,
  items,
  value,
  ResultOnClick,
  allClear,
  required,
  disabled
}) => {
  
  const divRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state variable

  useEffect(() => {
    // console.log("All Clear")
   setSearchResults([])
    setSearchTerm("")
    // setIsDropdownOpen(false)
   
  }, [allClear])
  
  console.log(value)

  const handleResultClick = (project) => {
    setSelectedItem(project);
    setSearchTerm(project.vendorName||project.contractorName); // Update the input field with the selected item's name
    ResultOnClick({ name: project.vendorName||project.contractorName, id: project._id });
    setIsDropdownOpen(false); // Close the dropdown after selection
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    // console.log('searching', e.target.value, items);
    let array=[]
    const filteredResults1 = items.filter((result) =>
      result.vendorName &&result.vendorName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // array.push(filteredResults1)
    const filteredResults2 = items.filter((result) =>
    result.contractorName && result.contractorName.toLowerCase().includes(e.target.value.toLowerCase())
    );
    // array.push(filteredResults2)
    array = array.concat(filteredResults1, filteredResults2);
    console.log('got', array);
    setSearchResults(array);
    setIsDropdownOpen(true); // Open the dropdown when input is clicked
  };

  const toggleDropdown = () => {
    setSearchResults(items?items:[])
    setIsDropdownOpen(true); // Toggle the dropdown open and close
  };

  return (
    <div className={`${styles.search_container} mt-0`} ref={divRef}>
      { title && <label htmlFor={id}>{title}</label>}
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          id={id}
          autoComplete="off"
          required={required?required:true}
          disabled={disabled?disabled:false}
          name={id}
          value={value?value:searchTerm}
          onChange={handleInputChange}
          onClick={toggleDropdown} // Toggle the dropdown when input is clicked
        />
        {isDropdownOpen && searchResults.length > 0 && ( // Only show dropdown when it is open
          <div className={styles.search_results}>
            <div className={styles.custom_dropdown}>
              {searchResults.map((result) => (
                <div
                  key={result._id}
                  className={styles.custom_option}
                  onClick={() => handleResultClick(result)}
                >
                  {result.vendorName||result.contractorName}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
  );
};

export default SearchInputVendor;