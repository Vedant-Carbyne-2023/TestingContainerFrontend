import { Button, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NavButton = ({ to, text, icon,activeLocation,  handleClosePopover,handleDrawerToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleClick = ()=>{
    if(isMobile){
      handleDrawerToggle()
    }
    else{
      handleClosePopover()
    }
  }
  return (
    <Button
      component={NavLink}
      to={to}
      variant="text"
      activeClassName="active"
      onClick={handleClick}
      
      sx={{
        backgroundColor: activeLocation  ? 'rgba(6, 137, 149, 0.09)' : "#f5f5f5",
        textTransform: "none",
        justifyContent:'left',
        paddingLeft:'1rem'
      }}
    >
      <i className={"fas fa-building"}></i>
      {text}
    </Button>
  );
};

export default NavButton;
