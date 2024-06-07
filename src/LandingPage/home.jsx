import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Home = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleDropdownHover = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleDropdownBlur = () => {
    // commercialTimeoutRef.current = setTimeout(() => {
    //   setShowDropdown(false);
    // }, 2000);

    timeoutRef.current = setTimeout(() => {
      setShowCommercialMenu(false);
    }, 2000);
  };

  useEffect(() => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.addEventListener("mouseenter", handleDropdownHover);
      dropdown.addEventListener("mouseleave", handleDropdownBlur);
    }

    return () => {
      if (dropdown) {
        dropdown.removeEventListener("mouseenter", handleDropdownHover);
        dropdown.removeEventListener("mouseleave", handleDropdownBlur);
      }
    };
  }, []);

  const customNavbarCollapseStyles = {
    height: 'auto',
    overflow: 'visible',
  };
  const backgroundSectionStyles = {
    // backgroundImage: `url('https://media.istockphoto.com/id/1439162947/photo/silhouette-of-engineer-and-worker-team-on-building-site-construction-site-at-sunset-in.webp?b=1&s=170667a&w=0&k=20&c=x0uVIhI0ealevNamRw1TAMMVHcIVwYHf8WkA2m_mX4E=')`,
    backgroundImage: `url('https://images.unsplash.com/photo-1599995903128-531fc7fb694b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmclMjBzaXRlfGVufDB8fDB8fHww&w=1000&q=80')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: 'calc(100vh - 70px)', // Adjust for navbar height
    // height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // Add this
    width: '100%',
  };
  

    return ( 
    <>
         {/* <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1000' }}>
      <NavLink className="navbar-brand" >
        <img
          src="../graphyne.jpg"
          style={{ borderRadius: "50%", cursor: "pointer" }}
          height="50px"
          width="50px"
          alt="Logo"
        />
        <span>GRAPHYNE</span>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded={showDropdown ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${showDropdown ? "show" : ""}`}
        id="navbarNavDropdown"
      >
        <div
          className={`collapse navbar-collapse ${
            showDropdown ? "show" : ""
          } d-md-flex justify-content-md-end`}
          style={customNavbarCollapseStyles}
          id="navbarNavDropdown"
        >
        <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className="nav-link" to={`/`}>
            <i className="fas fa-home"></i>
            <span>Home</span>
          </NavLink>
        </li> 
        <li className="nav-item">
          <NavLink className="nav-link" to={`/login`}>
          <i class="fa fa-sign-in" aria-hidden="true"></i>
            <span>Login</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={`/register`}>
          <i class="fa fa-user-plus" aria-hidden="true"></i>
            <span>Register</span>
          </NavLink>
        </li>
        </ul>
        {components && <ComponentList components={components} />}
      
        </div>
    </nav> */}
    {/* <div
        className="background-section"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1439162947/photo/silhouette-of-engineer-and-worker-team-on-building-site-construction-site-at-sunset-in.webp?b=1&s=170667a&w=0&k=20&c=x0uVIhI0ealevNamRw1TAMMVHcIVwYHf8WkA2m_mX4E=')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "calc(100vh - 56px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <h2 style={{ color: "white" }}>GRAPHYNE</h2>
        </div>
      </div> */}
      <div
         style={backgroundSectionStyles}
      >
        <div className="text-center" style={{backgroundColor: "white", borderRadius: "1.5rem"}}>
          <h2 className="p-2 m-0"style={{ color: "rgb(6, 137, 149)" }}>GRAPHYNE</h2>
        </div>
      </div>
    </> 
    );
}
 
export default Home;