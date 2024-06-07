import React, { useState, useRef, useEffect } from "react";

const SearchInputCategory = ({
  placeholder,
  id,
  title,
  disabled,
  items,
  ResultOnClick,
   className
}) => {
  console.log(items)
  const [searchTerm, setSearchTerm] = useState("");
  const divRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // New state variable

  const handleCategoryInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    const filteredResults = items.filter((result) =>
      (result.name).toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleResultClick = (project) => {
    setSearchTerm(project.name);
    ResultOnClick({name:project.name, id:project._id})
    setSearchResults([]); // Clear the search results
  };

  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setSearchResults([]); // Clear the search results
    }
  };

   const toggleDropdown = () => {
    // setSearchTerm(' ')
    setIsDropdownOpen(true); // Toggle the dropdown open and close
    setSearchResults(items?items:[])
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-container" ref={divRef}>
      <div className="form-group">
        <input
          disabled={disabled?disabled:false}
          type="text"
          className="form-control"
          autoComplete="off"
          required
          placeholder={placeholder}
          id={id}
          name={id}
          style={{width:'fit-content'}}
          value={searchTerm}
          onChange={handleCategoryInputChange}
          onClick={()=>toggleDropdown()} // Toggle the dropdown when input is clicked

        />
         {isDropdownOpen && searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div
                className="search-item"
                key={result._id}
                onClick={() => handleResultClick(result)}
              >
                {result.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInputCategory;
