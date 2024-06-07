import React, { useState } from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormDialog from './FormDialog'; // Create this component for your form

const MySpeedDial = () => {
    console.log('came here');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions = [
    // Add actions for the SpeedDial here, e.g., "Open Form"
    {
      icon: <ThumbDownIcon />, // Replace with your icon for opening the form
      name: 'Open Form',
      onClick: handleOpen,
    },
  ];

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick}
          />
        ))}
      </SpeedDial>
      {/* <FormDialog open={open} onClose={handleClose} /> Create this FormDialog component */}
    </div>
  );
};

export default MySpeedDial;
