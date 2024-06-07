import React, { useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import './adminNavbar.css'
export default function AdminNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCommercialsDropdownOpen, setIsCommercialsDropdownOpen] = useState(false);

  const handleProfileClick = () => {
    // Toggle the dropdown state
    setIsDropdownOpen(!isDropdownOpen);
    setIsCommercialsDropdownOpen(false);

  };
  const handleCommercialsClick = () => {
    // Toggle the commercials dropdown state
    setIsCommercialsDropdownOpen(!isCommercialsDropdownOpen);

    // Close the profile dropdown
    setIsDropdownOpen(false);
  };
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
    setIsCommercialsDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    Navigate("/login");
  };
  const dropdownClassName = "custom-nav-dropdown";
  return (
    <div className="container-fluid p-0">

      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        style={{
          zIndex: "1000",
          width: "100%",
          padding: "0rem 1rem",
          borderBottom: "5px solid rgba(6, 137, 149, 0.276)",
          position: "sticky",  // Add this line
          top: "0",             // Add this line to position it at the top
          backgroundColor: "white", // Add your background color
        }}
      >
        <Container fluid>
          <Navbar.Brand href="/login">
            <NavLink className="navbar-brand p-0" to="/">
              <img
                src="../graphyne.jpg"
                style={{ borderRadius: "50%", cursor: "pointer" }}
                height="50px"
                width="50px"
                alt="Logo"
              />
            </NavLink>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <NavLink exact to="/admin/organisation" className="nav-link">
                    <i className="fas fa-building"></i>
                    <span>Organisation</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/projects" className="nav-link">
                    <i className="fas fa-folder"></i>
                    <span>Projects</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/members" className="nav-link">
                    <i className="fas fa-users"></i>
                    <span>Members</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/permissions&roles" className="nav-link">
                    <i className="fa-solid fa-user-gear"></i>
                    <span>Permissions & Roles</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/bom" className="nav-link">
                    <i className="fa-solid fa-cube"></i>
                    <span>BOQ</span>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/admin/workOrder" className="nav-link">
                    <i className="fa-solid fa-cube"></i>
                    <span>WorkOrder</span>
                  </NavLink>
                </li>
                {/* <li className="nav-item">
                  <NavLink exact to="/admin/admin_tasks" className="nav-link">
                    <i className="fa fa-tasks"></i>
                    <span>Tasks</span>
                  </NavLink>
                </li> */}
                {/* <li className="nav-item">
                <NavLink exact to="/admin/jmr_count" className="nav-link">
                  <i className="fa fa-tasks"></i>
                  <span>Tasks</span>
                </NavLink>
              </li> */}
              </ul>

              <NavDropdown
                // style={{overflow: isDropdownOpen ? "auto":"hidden"}}
                title={
                  <span>
                    <i className="fa fa-bars"></i>
                    Commercials
                  </span>
                }
                // id="basic-nav-dropdown"
                maxHeight="500px"
                show={isCommercialsDropdownOpen}
                onSelect={handleDropdownClose}
                onClick={handleCommercialsClick}
                className={dropdownClassName}
                
                
              >
                <NavLink className="dropdown-item" to="/admin/vendorForm">
                  Vendor Detail Form
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/contractorForm">
                  Contractor Detail Form
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/indent">
                  Indents
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/purchaseOrder">
                  Purchase Order
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/inventory">
                  Inventory
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/grn">
                  GRN
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/machineDatabase">
                  Machine Database
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/materialDatabase">
                  Material Database
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/projectList">
                  Location Database
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/operational_boq">
                  Operational Boq
                </NavLink>

                <NavLink
                  className="dropdown-item"
                  to="/admin/password_requests"
                >
                  Password Requests
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/stockReportTillDate">
                  StockReport
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/logs">
                  Logs
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/approvals">
                  Order Approvals
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_main_form">
                  Dpr Main Form
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_vendor_page">
                  Dpr Vendor Page
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_change_request">
                  Dpr Changes Request
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_gp_approval_status">
                  Gp And Approval Status
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_mis_report">
                  Dpr MIS Report
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_daily_report">
                  Daily Dpr
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/dpr_consolidate_report">
                  Consolidate Report
                </NavLink>
                <NavLink className="dropdown-item" to="/admin/testing">
                  Testing
                </NavLink>
                
              </NavDropdown>
              <div
                style={{
                  display: "flex",
                  // marginLeft: "auto",
                  cursor: "pointer",
                  marginRight: "2rem",
                }}
              >
                <div className="dropdown profile">
                  <i className="fa-solid fa-user"
                    onClick={handleProfileClick}
                  ></i>
                  Profile
                  <div
                    className={`dropdown-menu ${isDropdownOpen ? "show" : ""} `}
                    style={{ overflow: isDropdownOpen ? "auto" : "hidden" }}
                  >
                    <NavLink to="/admin/user_profile" style={{ display: "block" }}>
                      <i className="fa-solid fa-user"></i>&nbsp; Profile
                    </NavLink>
                    <NavLink to="/login" onClick={handleLogout}>
                      <i className="fa-solid fa-sign-out"></i>&nbsp; Sign Out
                    </NavLink>
                  </div>
                </div>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="container-fluid p-0 mt-2">
        <Outlet />
      </div>
    </div>
  );
}
