import React, { useEffect, useState, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../AxiosSetup/axiosDefault";
import { errorHandler } from "../Others/errorHandle";
import { userId, role } from '../Others/commonExportVariable'
import ComponentList from "./ComponentList";
import useGetRoleWithPermission from "../customHooks/useGetRoleWithPermission";
import SpeedDialIcon from "./SpeedDialIcon/SpeedDialIcon";
import './Nav.css';

const UserNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    // Toggle the dropdown state
    setIsDropdownOpen(!isDropdownOpen);
  };
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    navigate("/login");
  };


  let components = useGetRoleWithPermission()




  return (
    <div className="container-fluid p-0">
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{
        zIndex: '1000',
        position: "sticky",  // Add this line
        top: "0",             // Add this line to position it at the top
        backgroundColor: "white", // Add your background color
      }}>
        <NavLink className="navbar-brand" to={"/"}>
          <img
            src="/graphyne.jpg"
            style={{ borderRadius: "50%", cursor: "pointer" }}
            height="50px"
            width="50px"
            alt="Logo"
          />
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
          {components && <ComponentList components={components} />}

          <SpeedDialIcon components={components} />
          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/user_purchaseOrder"
               
            >
              <i className="fas fa-folder"></i>
              <span>Purchase Order</span>
            </NavLink>
          </li> */}
          {/* {(role === "Project Manager" ||
            role === "Store Manager" ||
            role === "Store Team Member") && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/user_inventory">
                <i className="fas fa-users"></i>
                <span>Inventory</span>
              </NavLink>
            </li>
          )}
          {(role !== "Project Manager" ||
            role !== "Deputy Project Manager") && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/user_grn">
                <i className="fa-solid fa-user-gear"></i>
                <span>GRN(Gate Pass Requisition Number)</span>
              </NavLink>
            </li>
          )}
          {(role === "Project On-Site Team" ||
            role === "Project Manager" ||
            role === "Deputy Project Manager"||
            role === "Store Manager" ||
            role === "Store Team Member") && (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/user_tasks"
                activeClassName="active"
              >
                <i className="fa fa-tasks"></i>
                <span>Tasks</span>
              </NavLink>
            </li>
          )} */}
          {/* Add more NavLink items for other menu items */}

          <div
            style={{
              display: "flex",
              marginLeft: "auto",
              cursor: "pointer",
              marginRight: "2rem",
            }}
          >
            <div className="dropdown profile">
              <i className="fa-solid fa-user" onClick={handleProfileClick}></i>
              Profile
              <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <NavLink to="/user/profile/hello" className="dropdown-item">
                  <i className="fa-solid fa-user"></i>&nbsp; My Profile
                </NavLink>
                <NavLink to="/user/profile/changePassword" className="dropdown-item">
                  <i className="fa-solid fa-key"></i>&nbsp; Change Password
                </NavLink>
                <NavLink to="/user/profile/changeEmail" className="dropdown-item">
                  <i className="fa-solid fa-envelope"></i>&nbsp; Change Email
                </NavLink>
                <div className="dropdown-divider"></div>
                <NavLink to="/login" className="dropdown-item" onClick={handleLogout}>
                  <i className="fa-solid fa-sign-out"></i>&nbsp; Sign Out
                </NavLink>
              </div>
            </div>

          </div>
        </div>
      </nav>
      <div className="container-fluid p-0 mt-2">
        <Outlet />
      </div>
    </div>
  );
};

export default UserNavbar;
