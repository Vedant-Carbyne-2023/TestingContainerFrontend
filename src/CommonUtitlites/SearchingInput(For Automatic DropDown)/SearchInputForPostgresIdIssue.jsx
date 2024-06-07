import React, { useState, useRef } from "react";
import styles from "./Search.module.css";

const SearchInputPostgres = ({ placeholder, id, title, items, ResultOnClick, classSearch, required }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const divRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state variable

  const handleCategoryInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    const filteredResults = items.filter(
      (result) => result.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleResultClick = (project) => {
    setIsDropdownOpen(false); // Close the search results dropdown after selection
    setSearchTerm(project.name);
    ResultOnClick({ name: project.name, id: project.id, projectCode:project.projectCode });
  };

  const toggleDropdown = () => {
    setSearchResults(items); // Show all items in the dropdown when input is clicked
    setIsDropdownOpen(!isDropdownOpen); // Toggle the dropdown open and close
  };

  const handleAlphabetClick = (letter) => {
    // Filter items by alphabet when clicked
    const filteredResults = items.filter((result) =>
      result.name.toLowerCase().startsWith(letter.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <div className={styles.search_container} ref={divRef}>
      <div className="form-group mb-0">
        
        <label style={{display:classSearch ==="InOneLine" ?"none":'block' }} htmlFor={id}>{title}</label>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          id={id}
          required={required?required:false}
          autoComplete="off"
          name={id}
          value={searchTerm}
          onChange={handleCategoryInputChange}
          onClick={toggleDropdown} // Toggle the dropdown when input is clicked
        />
        {isDropdownOpen && searchResults.length > 0 && (
          <div className={styles.search_results}>
           
            <div className={styles.custom_dropdown}>
              {searchResults.map((result) => (
                <div
                  key={result.id}
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
    </div>
  );
};

export default SearchInputPostgres;
