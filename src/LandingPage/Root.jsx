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
} from "@mui/material";
import { NavLink, Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Root() {
  const [showDrawer, setShowDrawer] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setShowDrawer(!showDrawer);
  };

  return (
    <div style={{display: "flex", flexDirection: "column" }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#f5f5f5",  display:"flex", alignItems:'center' }}>
        <Container maxWidth={"100%"} sx={{padding:'0 !important', margin:0}}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <LogoAndMenuIcon isMobile={isMobile} handleDrawerToggle={handleDrawerToggle} />
            {!isMobile && <NavLinks />}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="left" open={showDrawer} onClose={handleDrawerToggle}>
        <List >
          <NavLinks handleDrawerToggle={handleDrawerToggle} isMobile={isMobile} />
        </List>
      </Drawer>

      <div style={{  display: "flex", height:'100vh', justifyContent: "center", alignItems: "center" }}>
        <Outlet />
      </div>
    </div>
  );
}

const LogoAndMenuIcon = ({ isMobile, handleDrawerToggle }) => {
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

const NavLinks = ({ handleDrawerToggle,isMobile }) => {
  return (
    <React.Fragment>
      <Box sx={{display:'flex', flexDirection:isMobile?'column':'row',  textAlign:'left', justifyContent:'left  '}}>
      <Button as={NavLink} to="/" variant="text"  sx={{ mr: 1, fontWeight:'bold' }} onClick={handleDrawerToggle} activeClassName="active">
        <i className="fas fa-home mr-2" style={{ color: "white" }}></i>
        Home
      </Button>
      <Button as={NavLink} to="/login" variant="text" sx={{ mr: 1, fontWeight:'bold' }} onClick={handleDrawerToggle} activeClassName="active">
        <i className="fas fa-sign-in-alt mr-2" style={{ color: "white" }}></i>Login
      </Button>
      <Button as={NavLink} to="/register" variant="text" sx={{ mr: 1, fontWeight:'bold' }} onClick={handleDrawerToggle} activeClassName="active">
        <i className="fas fa-user-plus mr-2" style={{ color: "white" }}></i>Register
      </Button>
      </Box>
    </React.Fragment>
  );
};
