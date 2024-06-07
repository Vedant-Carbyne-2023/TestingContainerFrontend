import React, { useEffect, useState, useRef } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { api } from "../AxiosSetup/axiosDefault";
import { errorHandler } from "../Others/errorHandle";
import { userId, role } from '../Others/commonExportVariable'
import ComponentList from "./ComponentList";
import useGetRoleWithPermission from "../customHooks/useGetRoleWithPermission";
import SpeedDialIcon from "./SpeedDialIcon/SpeedDialIcon";
import './Nav.css';
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Hidden,
  Box,
  Popover,
  useTheme,
  useMediaQuery,
  Grid,
  Menu,
  MenuItem,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, ArrowDropDown,  Logout } from "@mui/icons-material";
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


const [showDrawer, setShowDrawer] = useState(false)
const handleDrawerToggle=()=>{setShowDrawer(!showDrawer)}

const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [anchorEl2, setAnchorEl2] = useState(null);

const handleMenuClick = (event) => {
  setAnchorEl2(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl2(null);
};

const toggleChildMenu = () => setOpenChildMenu(!openChildMenu);




  return (
    <div style={{display: "flex", flexDirection: "column", marginTop:'5rem' }}>
    <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5",  display:"flex", alignItems:'center' }}>
      <Container maxWidth={"100%"} sx={{padding:'0 !important', margin:0}}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <LogoAndMenuIcon isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} anchorEl2={anchorEl2} handleMenuClick={handleMenuClick} handleMenuClose={handleMenuClose}/>
          {/* {!isMobile && <NavLinks handleDrawerToggle={handleDrawerToggle} openChildMenu={openChildMenu} handleClosePopover={handleClosePopover} anchorEl={anchorEl} handleLinkWithChildClick={handleLinkWithChildClick}/>} */}
          {!isMobile && components && <ComponentList components={components}  handleDrawerToggle={handleDrawerToggle}  />}

        { !isMobile && <Box style={{ display: 'flex',  cursor: 'pointer'}}>
    <IconButton onClick={handleMenuClick } >
      <AccountCircle color="primary"/>
      <Typography variant="h6" color={"primary"} mx={1}>
        Profile
      </Typography>
      
    </IconButton>
    <Menu
      anchorEl={anchorEl2}
      color="primary"
      open={Boolean(anchorEl2)}
      onClose={handleMenuClose}
      sx={{display:'flex', justifyContent:"left"}}
    >
    <MenuItem  component={Link} to="/user/profile/hello" onClick={handleMenuClose} sx={{margin:'0.3em 0'}}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
       My Profile
      </MenuItem>
      <MenuItem  component={Link} to="/user/profile/changePassword" onClick={handleMenuClose} sx={{margin:'0.3em 0'}}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
      Change PassWord
      </MenuItem>
      <MenuItem  component={Link} to="/user/profile/changeEmail" onClick={handleMenuClose} sx={{margin:'0.3em 0'}}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
      Change Email
      </MenuItem>
      <MenuItem component={Link} to="/login" onClick={handleLogout} sx={{margin:'0.3em 0'}}>
        <Logout color="primary" sx={{ mr: 1 }} />
        Sign Out
      </MenuItem>
    </Menu>
  </Box>}
        </Toolbar>
      </Container>
    </AppBar>

    <Drawer anchor="left" open={showDrawer} onClose={handleDrawerToggle}>
      <List >
        {components && <ComponentList components={components}  handleDrawerToggle={handleDrawerToggle}/>}
      </List>
    </Drawer>

    <div style={{  display: "flex", flexDirection:'column', marginBottom:"2rem",  }}>
      <Outlet />
    </div>
  </div>
  );
};

const LogoAndMenuIcon = ({ isMobile, handleDrawerToggle ,anchorEl2, handleMenuClick, handleMenuClose }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    Navigate("/login");
  };

 
  return (
    <React.Fragment>
      {isMobile ? (
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
              <MenuIcon sx={{ color: "rgba(6, 137, 149, 0.756)" }} />
            </IconButton>
          </Grid>
          <Grid item>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <img src="/graphyne.jpg" height={30} alt="Logo" style={{ marginRight: "8px" }} />
              <Typography variant="h6" sx={{  fontWeight: "bold", color: "rgba(6, 137, 149, 0.756)" }}>
                Graphyne
              </Typography>
            </Box>
           
          </Grid>
          <Box style={{ display: 'flex',  cursor: 'pointer'}}>
    <IconButton onClick={handleMenuClick } >
      <AccountCircle color="primary"/>
    </IconButton>
    <Menu
      anchorEl={anchorEl2}
      color="primary"
      open={Boolean(anchorEl2)}
      onClose={handleMenuClose}
      sx={{display:'flex', justifyContent:"left"}}
    >
      <MenuItem  component={Link} to="/user/profile/hello" onClick={handleMenuClose}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      <MenuItem  component={Link} to="/user/profile/changePassword" onClick={handleMenuClose}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
      Change PassWord
      </MenuItem>
      <MenuItem  component={Link} to="/user/profile/changeEmail" onClick={handleMenuClose}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
      Change Email
      </MenuItem>
      <MenuItem component={Link} to="/login" onClick={handleLogout}>
        <Logout color="primary" sx={{ mr: 1 }} />
        Sign Out
      </MenuItem>
    </Menu>
  </Box>
        </Grid>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src="/graphyne.jpg" height={30} alt="Logo" style={{ marginRight: "8px" }} />
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "rgba(6, 137, 149, 0.756)" }}>
            Graphyne
          </Typography>
        </Box>
      )}
    </React.Fragment>
  );
};

export default UserNavbar;
