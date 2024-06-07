import React from 'react';
import Dialog from '@mui/material/Dialog';

const FormDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* Your form content goes here */}
      <div> Welcome!</div>
    </Dialog>
  );
};

export default FormDialog;
