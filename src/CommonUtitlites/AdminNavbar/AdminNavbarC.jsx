import React, { useState, useRef, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { role } from "../Others/commonExportVariable";
// import "./Navbar.css";

const AdminNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCommercialMenu, setShowCommercialMenu] = useState(false);
  const [showShouldDropdown, setShowShouldDropdown] = useState(false);

  const dropdownRef = useRef(null);
  const commercialTimeoutRef = useRef(null);
  const timeoutRef = useRef(null);
  const location = useLocation();

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

  useEffect(() => {
    const shouldShowDropdown =
      location.pathname.startsWith("/vendorForm") ||
      location.pathname.startsWith("/indent") ||
      location.pathname.startsWith("/purchaseOrder") ||
      location.pathname.startsWith("/inventory") ||
      location.pathname.startsWith("/grn") ||
      location.pathname.startsWith("/materialDatabase") ||
      location.pathname.startsWith("/projectList")||
      (role === "SuperUser" && location.pathname.startsWith("/password_requests") ||
          location.pathname.startsWith("/all_logs") ||
          location.pathname.startsWith("/approvals")
      );

    setShowShouldDropdown(shouldShowDropdown);
  }, [location]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    Navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1000' }}>
      <NavLink className="navbar-brand" to="/organisation">
        <img
          src="./graphyne.jpg"
          style={{ borderRadius: "50%", cursor: "pointer" }}
          height="60px"
          width="60px"
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
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink exact to="/organisation" className="nav-link">
              <i className="fas fa-building"></i>
              <span>Organisation</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/projects" className="nav-link">
              <i className="fas fa-folder"></i>
              Projects
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/members" className="nav-link">
              <i className="fas fa-users"></i>
              <span>Members</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/permissions&roles" className="nav-link">
              <i className="fa-solid fa-user-gear"></i>
              <span>Permissions & Roles</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/bom" className="nav-link">
              <i className="fa-solid fa-cube"></i>
              <span>BOQ</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/workOrder" className="nav-link">
              <i className="fa-solid fa-cube"></i>
              <span>WorkOrder</span>
            </NavLink>
          </li>
          <li className="nav-item dropdown" ref={dropdownRef}>
            <a
              className={`nav-link dropdown-toggle ${
                showShouldDropdown ? "active" : ""
              }`}
              href="#"
              id="navbarDropdownMenuLink"
              data-toggle="dropdown"
              onMouseEnter={() => setShowCommercialMenu(true)}
              aria-haspopup="true"
              aria-expanded={showCommercialMenu ? "true" : "false"}
              onClick={() => setShowCommercialMenu(!showCommercialMenu)}
            >
              <i
                className="fa-solid fa-tags commercial"
                onClick={() => setShowCommercialMenu(!showCommercialMenu)}
              ></i>
              Commercials
            </a>
            <div
              className={`dropdown-menu ${showCommercialMenu ? "show" : ""}`}
              aria-labelledby="navbarDropdownMenuLink"
              onMouseEnter={handleDropdownHover}
              onMouseLeave={handleDropdownBlur}
            >
              <NavLink className="dropdown-item" to="/vendorForm">
                Vendor Detail Form
              </NavLink>
              <NavLink className="dropdown-item" to="/contractorForm">
                Contractor Detail Form
              </NavLink>
              <NavLink className="dropdown-item" to="/indent">
                Indents
              </NavLink>
              <NavLink className="dropdown-item" to="/purchaseOrder">
                Purchase Order
              </NavLink>
              <NavLink className="dropdown-item" to="/inventory">
                Inventory
              </NavLink>
           
              <NavLink className="dropdown-item" to="/grn">
                GRN
              </NavLink>
              <NavLink className="dropdown-item" to="/materialDatabase">
                Material Database
              </NavLink>
              <NavLink className="dropdown-item" to="/projectList">
                Project Detailed List
              </NavLink>
              { role === "SuperUser"&& 
                <NavLink className="dropdown-item" to="/password_requests">
                  Password Requests
                </NavLink>
              }
              { role === "SuperUser"&& 
                <NavLink className="dropdown-item" to="/stockReport">
                  StockReport
                </NavLink>
              }
              { role === "SuperUser"&& 
                <NavLink className="dropdown-item" to="/stockReportTillDate">
                  StockReportTillDate
                </NavLink>
              }
              { role === "SuperUser"&& 
                <NavLink className="dropdown-item" to="/logs">
                  Logs
                </NavLink>
              }
              { role === "SuperUser"&& 
                <NavLink className="dropdown-item" to="/approvals">
                  Order Approvals
                </NavLink>
              }
            </div>
          </li>
          <li className="nav-item">
              <NavLink exact to="/admin_tasks" className="nav-link">
                <i className="fa fa-tasks"></i>
                <span>Tasks</span>
              </NavLink>
            </li>
        </ul>

        <div
          style={{
            display: "flex",
            marginLeft: "auto",
            cursor: "pointer",
            marginRight: "2rem",
          }}
        >
          <div className="dropdown profile">
            <i className="fa-solid fa-user"></i>
            Profile
            <div className="dropdown-menu">
              <NavLink to="/user_profile">
                <i className="fa-solid fa-user"></i>&nbsp; Profile
              </NavLink>
              <NavLink to="/login" onClick={handleLogout}>
                <i className="fa-solid fa-sign-out"></i>&nbsp; Sign Out
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
