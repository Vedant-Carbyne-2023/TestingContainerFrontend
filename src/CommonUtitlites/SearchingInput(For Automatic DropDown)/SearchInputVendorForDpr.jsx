import React, { useState, useRef, useEffect } from "react";
import styles from './Search.module.css';

const SearchInputVendorForDpr = ({
  placeholder,
  id,
  title,
  defaultValue,
  items,
  value,
  ResultOnClick,
  allClear,
  required,
  disabled
}) => {
  const divRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState(defaultValue || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setSearchResults([]);
    setSearchTerm("");
  }, [allClear]);

  useEffect(() => {
    if(defaultValue){
      setInputValue(defaultValue)
    }
  }, [defaultValue])
  

  const handleResultClick = (project) => {
    console.log("here")
    // setSelectedItem(project);
    setSearchTerm(project.vendorName || project.contractorName);
    setInputValue(project.vendorName || project.contractorName);
    ResultOnClick({ name: project.vendorName || project.contractorName, id: project._id });
    setIsDropdownOpen(false);
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
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
    setInputValue(e.target.value);
    const filteredResults1 = items.filter((result) =>
      result.vendorName && result.vendorName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const filteredResults2 = items.filter((result) =>
      result.contractorName && result.contractorName.toLowerCase().includes(e.target.value.toLowerCase())
    );

    const array = [...filteredResults1, ...filteredResults2];
    setSearchResults(array);
    setIsDropdownOpen(true);
  };

  const toggleDropdown = () => {
    setSearchResults(items ? items : []);
    setIsDropdownOpen(true);
  };

  return (
    <div className={`${styles.search_container} mt-0`} ref={divRef}>
      {title && <label htmlFor={id}>{title}</label>}
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        id={id}
        autoComplete="off"
        required={required ? required : true}
        disabled={disabled ? disabled : false}
        name={id}
        value={inputValue}
        onChange={handleInputChange}
        onClick={toggleDropdown}
      />
      {isDropdownOpen && searchResults.length > 0 && (
        <div className={styles.search_results}>
          <div className={styles.custom_dropdown}>
            {searchResults.map((result) => (
              <div
                key={result._id}
                className={styles.custom_option}
                onClick={() => handleResultClick(result)}
              >
                {result.vendorName || result.contractorName}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputVendorForDpr;
