import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomModal = ({ isOpen, title, onClose, size, children }) => {
  const modalRef = useRef(null);
  const [modalHeight, setModalHeight] = useState('auto');
  const [contentChanged, setContentChanged] = useState(false);

  useEffect(() => {
    if (isOpen && modalRef.current && children) {
      setModalHeight('auto');
      const contentHeight = modalRef.current.clientHeight;
      console.log(contentHeight)
      setModalHeight(contentHeight);
      setContentChanged(false);
    }
  }, [modalRef, children]);
  
  // useEffect(() => {
  //   if(isOpen){
  //     setContentChanged(true);
  //   }
  //   else{
  //     setContentChanged(false);
  //   }
  // }, [isOpen, onClose]);



  const closeModal = () => {
    setContentChanged(false);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const modalClassName = isOpen ? 'modal open' : 'modal';
  // const modalDialogClasses = `modal-dialog ${
  //   size === 'large' ? 'modal-lg' : size === 'xl' ? 'modal-xl' : 'sm'
  // }`;
  const modalDialogClasses = `modal-dialog modal-xl`;

  const modalStyle = {
    display: 'block',
    marginTop: '50px',
  };

  const contentStyle = {
    height:
      modalHeight !== 'auto'
        ? modalHeight > 400
          ? `70vh`
          : `70vh`
        : '70vh',
    maxHeight:
      modalHeight !== 'auto'
        ? modalHeight > 400
        ? `70vh`
          : `70vh`
        : '70vh',
    overflowY: 'auto',
  };

  return (
    <div style={{zIndex:"2000"}}>
      <div className={modalClassName} style={modalStyle}>
        <div className={modalDialogClasses}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={closeModal}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body" style={contentStyle} ref={modalRef}>
              {children}
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModal;
