import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { api } from "../AxiosSetup/axiosDefault";
import { errorHandler } from "../Others/errorHandle";
import {userId, role} from '../Others/commonExportVariable'
const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    navigate("/login");
  };

  const [showDropdown, setShowDropdown] = useState(false);

    const [components, setComponents] = useState([])

  useEffect(() => {
    
    const getComponentToRender = async()=>{
      let result = api.post('/get-user-role',{userId,role})
      result = await errorHandler( result)
      setComponents(result.data.data.permissions)
    }
    
    getComponentToRender()
  }, [])
  

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ zIndex: '1000' }}>
      <NavLink className="navbar-brand" to="/user_indents">
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
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded={showDropdown ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${showDropdown ? "show" : ""}`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          {(role === "Project On-Site Team" ||
            role === "Project Manager" ||
            role === "Deputy Project Manager") && (
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/user_indents">
                <i className="fas fa-building"></i>
                <span>Indents (MR)</span>
              </NavLink>
            </li>
          )}
          {/* <li className="nav-item">
            <NavLink
              className="nav-link"
              to="/user_purchaseOrder"
               
            >
              <i className="fas fa-folder"></i>
              <span>Purchase Order</span>
            </NavLink>
          </li> */}
          {(role === "Project Manager" ||
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
          )}
          {/* Add more NavLink items for other menu items */}
        </ul>
        <h6>{role}</h6>
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
              <NavLink to="/user-profile">
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

export default UserNavbar;
