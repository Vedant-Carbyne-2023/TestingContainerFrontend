import React, { useState } from "react";
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
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { AccountCircle, ArrowDropDown,  Logout } from "@mui/icons-material";
import NavButton from "./CommercialButton";

export default function Root() {
  const [showDrawer, setShowDrawer] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
  };
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openChildMenu, setOpenChildMenu] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerOpen = () => setIsDrawerOpen(true);
  const handleDrawerClose = () => setIsDrawerOpen(false);
  const toggleChildMenu = () => setOpenChildMenu(!openChildMenu);
  const handleLinkWithChildClick = (event) => {
    // if (!isMobile) {
      setAnchorEl(event.currentTarget);
      toggleChildMenu();
    // }
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
    setOpenChildMenu(false);
  };
  
  return (
    <div style={{display: "flex", flexDirection: "column", marginTop:'5rem' }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5",  display:"flex", alignItems:'center' }}>
        <Container maxWidth={"100%"} sx={{padding:'0 !important', margin:0}}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <LogoAndMenuIcon isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />
            {!isMobile && <NavLinks handleDrawerToggle={handleDrawerToggle} openChildMenu={openChildMenu} handleClosePopover={handleClosePopover} anchorEl={anchorEl} handleLinkWithChildClick={handleLinkWithChildClick}/>}
            
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={showDrawer} onClose={handleDrawerToggle}>
        <List >
          <NavLinks anchorEl={anchorEl}  toggleChildMenu={toggleChildMenu} openChildMenu={openChildMenu} handleClosePopover={handleClosePopover} handleLinkWithChildClick={handleLinkWithChildClick}  handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
        </List>
      </Drawer>

      <div style={{  display: "flex", flexDirection:'column', marginBottom:"2rem",  }}>
        <Outlet />
      </div>
    </div>
  );
}

const LogoAndMenuIcon = ({ isMobile, handleDrawerToggle }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    Navigate("/login");
  };

  const [anchorEl2, setAnchorEl2] = useState(null);

const handleMenuClick = (event) => {
  setAnchorEl2(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl2(null);
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
      <MenuItem  component={Link} to="/admin/user_profile" onClick={handleMenuClose}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
        Profile
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

const NavLinks = ({ toggleChildMenu, anchorEl,handleClosePopover, handleDrawerToggle,isMobile, handleLinkWithChildClick, openChildMenu }) => {
  const location=useLocation()
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user_Id");
    Navigate("/login");
  };

  const [submenuOpen, setSubmenuOpen] = useState(false);

  const handleToggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

  const [anchorEl2, setAnchorEl2] = useState(null);

const handleMenuClick = (event) => {
  setAnchorEl2(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl2(null);
};

console.log(openChildMenu)
  return (
    <React.Fragment>
      <Box sx={{display:'flex', flexDirection:isMobile?'column':'row',  textAlign:'left', justifyContent:'left  '}}>
      {/* <Button as={NavLink} to="/admin/organisation" variant="text"   onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fas fa-building" ></i>
        Organisation
      </Button> */}
      {/* <Button as={NavLink} to="/admin/projects" variant="text"  onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fas fa-folder" ></i>Projects
      </Button>
      <Button as={NavLink} to="/admin/members" variant="text" onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fas fa-users" ></i>Members
      </Button>
      <Button as={NavLink} to="/admin/permissions&roles" variant="text" onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fa-solid fa-user-gear" ></i>Permissions & Roles
      </Button>
      <Button as={NavLink} to="/admin/bom" variant="text" onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fa-solid fa-cube" ></i>Boq
      </Button> */}
      <Button as={NavLink} to="/admin/workOrder" variant="text"  onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fa-solid fa-cube" ></i>Work Orders
      </Button>
      <Button as={NavLink} to="/admin/vendorProfile" variant="text"  onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fa-solid fa-cube" ></i>Vendors
      </Button>
      <Button as={NavLink} to="/admin/inventory_management" variant="text"  onClick={isMobile?handleDrawerToggle:""} activeClassName="active">
        <i className="fa-solid fa-cube" ></i>Inventory
      </Button>

            
      </Box>
      <Box sx={{ display:{xs:"none",md:"flex"},  cursor: 'pointer'}}>
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
      <MenuItem  component={Link} to="/admin/user_profile" onClick={handleMenuClose}>
        <AccountCircle color="primary" sx={{ mr: 1 }} />
        Profile
      </MenuItem>
      <MenuItem component={Link} to="/login" onClick={handleLogout}>
        <Logout color="primary" sx={{ mr: 1 }} />
        Sign Out
      </MenuItem>
    </Menu>
  </Box>
    </React.Fragment>
  );
};




// {isMobile && (
//   <React.Fragment>
//     <Button color="primary" sx={{justifyContent:'left'}} onClick={handleToggleSubmenu} endIcon={<ArrowDropDown />}>
//       <i className="fa-solid fa-cube"></i> Commercials
//     </Button>
//     <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
//       <Box sx={{ pl: 4 }}>
//       <NavButton to="/admin/vendorForm" activeLocation={location.pathname === '/admin/vendorForm'} text="Vendor Detail Form" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle} />
// {/* <NavButton to="/admin/contractorForm" activeLocation={location.pathname === '/admin/contractorForm'} text="Contractor Detail Form" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/> */}
// <NavButton to="/admin/indent" activeLocation={location.pathname === '/admin/indent'} text="Indents" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/purchaseOrder" activeLocation={location.pathname === '/admin/purchaseOrder'} text="Purchase Order" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/inventory" activeLocation={location.pathname === '/admin/inventory'} text="Inventory" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/grn" activeLocation={location.pathname === '/admin/grn'} text="GRN" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/machineDatabase" activeLocation={location.pathname === '/admin/machineDatabase'} text="Machine Database" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/materialDatabase" activeLocation={location.pathname === '/admin/materialDatabase'} text="Material Database" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/projectList" activeLocation={location.pathname === '/admin/projectList'} text="Location Database" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/operational_boq" activeLocation={location.pathname === '/admin/operational_boq'} text="Operational Boq" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/password_requests" activeLocation={location.pathname === '/admin/password_requests'} text="Password Requests" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/stockReportTillDate" activeLocation={location.pathname === '/admin/stockReportTillDate'} text="StockReport" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/logs" activeLocation={location.pathname === '/admin/logs'} text="Logs" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/approvals" activeLocation={location.pathname === '/admin/approvals'} text="Order Approvals" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_main_form" activeLocation={location.pathname === '/admin/dpr_main_form'} text="Dpr Main Form" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_vendor_page" activeLocation={location.pathname === '/admin/dpr_vendor_page'} text="Dpr Vendor Page" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_change_request" activeLocation={location.pathname === '/admin/dpr_change_request'} text="Dpr Changes Request" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_gp_approval_status" activeLocation={location.pathname === '/admin/dpr_gp_approval_status'} text="Gp And Approval Status" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle} / >
// <NavButton to="/admin/dpr_mis_report" activeLocation={location.pathname === '/admin/dpr_mis_report'} text="Dpr MIS Report" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_daily_report" activeLocation={location.pathname === '/admin/dpr_daily_report'} text="Daily Dpr" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/dpr_consolidate_report" activeLocation={location.pathname === '/admin/dpr_consolidate_report'} text="Consolidate Report" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>
// <NavButton to="/admin/testing" activeLocation={location.pathname === '/admin/testing'} text="Testing" handleClosePopover={handleClosePopover} handleDrawerToggle={handleDrawerToggle}/>

//       </Box>
//     </Collapse>
//   </React.Fragment>
// )}
// {!isMobile && (
//   <Box>
//     <Button  color="primary" onClick={handleLinkWithChildClick} endIcon={<ArrowDropDown />}>
//       <i className="fa-solid fa-cube"></i> Commercials
//     </Button>
//     <Popover
//     sx={{height:"31em",  textAlign:'left'}}
//       open={openChildMenu}
//       anchorEl={anchorEl}
    
//       onClose={handleClosePopover}
//       anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
//       transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      
//     >
//    <NavButton to="/admin/vendorForm" activeLocation={location.pathname === '/admin/vendorForm'} text="Vendor Detail Form" handleClosePopover={handleClosePopover} />
// {/* <NavButton to="/admin/contractorForm" activeLocation={location.pathname === '/admin/contractorForm'} text="Contractor Detail Form" handleClosePopover={handleClosePopover}/> */}
// <NavButton to="/admin/indent" activeLocation={location.pathname === '/admin/indent'} text="Indents" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/purchaseOrder" activeLocation={location.pathname === '/admin/purchaseOrder'} text="Purchase Order" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/inventory" activeLocation={location.pathname === '/admin/inventory'} text="Inventory" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/grn" activeLocation={location.pathname === '/admin/grn'} text="GRN" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/machineDatabase" activeLocation={location.pathname === '/admin/machineDatabase'} text="Machine Database" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/materialDatabase" activeLocation={location.pathname === '/admin/materialDatabase'} text="Material Database" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/projectList" activeLocation={location.pathname === '/admin/projectList'} text="Location Database" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/operational_boq" activeLocation={location.pathname === '/admin/operational_boq'} text="Operational Boq" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/password_requests" activeLocation={location.pathname === '/admin/password_requests'} text="Password Requests" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/stockReportTillDate" activeLocation={location.pathname === '/admin/stockReportTillDate'} text="StockReport" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/logs" activeLocation={location.pathname === '/admin/logs'} text="Logs" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/approvals" activeLocation={location.pathname === '/admin/approvals'} text="Order Approvals" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_main_form" activeLocation={location.pathname === '/admin/dpr_main_form'} text="Dpr Main Form" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_vendor_page" activeLocation={location.pathname === '/admin/dpr_vendor_page'} text="Dpr Vendor Page" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_change_request" activeLocation={location.pathname === '/admin/dpr_change_request'} text="Dpr Changes Request" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_gp_approval_status" activeLocation={location.pathname === '/admin/dpr_gp_approval_status'} text="Gp And Approval Status" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_mis_report" activeLocation={location.pathname === '/admin/dpr_mis_report'} text="Dpr MIS Report" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_daily_report" activeLocation={location.pathname === '/admin/dpr_daily_report'} text="Daily Dpr" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/dpr_consolidate_report" activeLocation={location.pathname === '/admin/dpr_consolidate_report'} text="Consolidate Report" handleClosePopover={handleClosePopover}/>
// <NavButton to="/admin/testing" activeLocation={location.pathname === '/admin/testing'} text="Testing" handleClosePopover={handleClosePopover}/>

//     </Popover>
//   </Box>
// )}


