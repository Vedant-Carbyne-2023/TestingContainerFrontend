import { Box, Button, List, Popover, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowDropDown } from "@mui/icons-material";
import NavButton from "./CommercialButton";

function ComponentList({ components, handleDrawerToggle  }) {
  
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toLowerCase = (str) => {
    return str.toLowerCase();
  };

  let location = useLocation()
  const generateDisplayedComponents = (start, end) => {
    const pathname = decodeURIComponent(location.pathname);
    
    return components.slice(start, end).map((component) => {
      const componentPath = `/user/${toLowerCase(component.nameOfComponent)}/${component._id}`;
      const isActive = componentPath === pathname;
      
      return (
        <NavButton
          activeLocation={isActive}
          handleClosePopover={handleClose}
          handleDrawerToggle={handleDrawerToggle}
          text={component.nameOfComponent}
          to={componentPath}
        />
      );
    });
  };
  
  
  

  

  const displayedComponents = generateDisplayedComponents(0, 4);
  const hiddenComponents = generateDisplayedComponents(4);
  let allComponents = generateDisplayedComponents()

  return (
    <Box sx={{display:'flex', flexDirection: isMobile?'column':"row", alignItems:'center'}}>

      {
        !isMobile
        ?
        <>
       <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }} >
  {displayedComponents}
</Box>
      
      {/* <ul className="navbar-nav">
        <li className="nav-item">
        <NavLink
                className="nav-link"
                exact
                to="/user/tasks"
                activeClassName="active"
              >
                <i className="fa fa-tasks"></i>
                <span>Tasks</span>
              </NavLink>
        </li>
      </ul> */}
     {hiddenComponents.length > 0 && (
        <Box ml={1}>
          <Button onClick={handleClick} endIcon={<ArrowDropDown/>}>More</Button>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <List sx={{ width: "25rem", overflow: 'auto', maxHeight: "60vh" }}>
              {hiddenComponents}
            </List>
          </Popover>
        </Box>
      )}
        </>

        :
<Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row' }} >
  {allComponents}
</Box>

      }
      
{/* <div className="nav-item">
              <NavLink
                className="nav-link"
                exact
                to="/user_tasks"
                activeClassName="active"
              >
                <i className="fa fa-tasks"></i>
                <span>Tasks</span>
              </NavLink>
            </div> */}
    </Box>
  );
}

export default ComponentList;
