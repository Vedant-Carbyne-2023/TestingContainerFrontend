import React, { useState, useRef, useEffect } from "react";
import styles from './Search.module.css';

const SearchInputGpForDpr = ({
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
    setSearchTerm(project.name || project.name);
    setInputValue(project.name || project.name);
    ResultOnClick({ name: project.name , id: project._id });
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
      result.name && result.name.toLowerCase().includes(e.target.value.toLowerCase())
    ).sort((a, b) => a.name.localeCompare(b.name));
   
   
    setSearchResults(filteredResults1);
    setIsDropdownOpen(true);
  };

  const toggleDropdown = () => {
    const sortedItems = items
    ? [...items].sort((a, b) => a.name.localeCompare(b.name))
    : [];
  setSearchResults(sortedItems);
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
                {result.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInputGpForDpr;
