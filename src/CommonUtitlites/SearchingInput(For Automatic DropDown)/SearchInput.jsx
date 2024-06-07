import React, { useState, useRef, useEffect } from "react";

import styles from './Search.module.css'


const SearchInput = ({
  placeholder,
  id,
  title,
  items,
  value,
  ResultOnClick,
  allClear,
  disabled,
  required
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
    setSearchTerm(project.name); // Update the input field with the selected item's name
    ResultOnClick({ name: project.name, id: project._id });
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
    console.log("Here")
    // Update the state only if the component is not controlled
   setSearchTerm(e.target.value)
    const filteredResults = items.filter((result) =>
      result.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchResults(filteredResults);
    setIsDropdownOpen(true); // Open the dropdown when input is clicked
  };

  const toggleDropdown = () => {
    setSearchResults(items ? items : [])
    setIsDropdownOpen(true); // Toggle the dropdown open and close
  };

  return (
    <div className={`${styles.search_container} mt-0`} ref={divRef}>
      {title && <label htmlFor={id}>{title}</label>}
      <input
        style={{width:"220px"}}
        type="text"
        className="form-control"
        placeholder={placeholder?placeholder:"Select Data"}
        id={id}
        autoComplete="off"
        required={required ? required : false}
        disabled={disabled ? disabled : false}
        name={id}
        // defaultValue={value?value:searchTerm}
        value={searchTerm?searchTerm:value}
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
                {result.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInput;
