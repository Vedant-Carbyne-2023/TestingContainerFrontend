import React, { useState, useRef, useEffect } from 'react';
import styles from './SpeedDial.module.css';
import { api } from "../../AxiosSetup/axiosDefault";  
import { errorHandler } from '../../Others/errorHandle';
import { userId, role, userName } from '../../Others/commonExportVariable';
import Swal from 'sweetalert2';

const SpeedDialIcon = ({ components }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [screenName, setScreenName] = useState('');
  const [errorCode, setErrorCode] = useState('');
  const [message, setMessage] = useState('');
  const messageBoxRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (messageBoxRef.current && !messageBoxRef.current.contains(event.target)) {
        setIsClicked(false);
      }
    }

    if (isClicked) {
      // Add a click event listener to the document to detect clicks outside the message box
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove the click event listener when the message box is closed
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isClicked]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleMessageBoxClick = (e) => {
    e.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    setIsClicked(false);
  };

  const handleSubmit = async () => {
    try {
      console.log(screenName, errorCode, message);
      let result = api.post("/create-issue", {screenName, errorCode, message, userId, role, userName});
      result = await errorHandler(result);
      Swal.fire(result.data.message);
      // alert(result.data.message);
      console.log('API response:', result);
      
      // Optionally, you can display a success message to the user or perform other actions
    } catch (error) {
      // Handle API request errors
      console.error('API request error:', error);
      
      // Optionally, you can display an error message to the user or perform other error-handling actions
    }
  };

  return (
    <div className={styles.speedDialIcon} onClick={handleClick}>
      {isClicked && (
        <div className={styles.messageBox} onClick={handleMessageBoxClick} ref={messageBoxRef}>
          
          <i className={`fas fa-close ${styles.closeButton}`} onClick={handleCloseButtonClick}></i>
          
          <label>Name The Tab Which Has Error</label>
          <select
            className="form-control"
            defaultValue={screenName}
            onChange={(e) => setScreenName(e.target.value)}
          >
            <option value="">Select the Screen</option>
            {components &&
              components.map((component) => (
                <option key={component.nameOfComponent}>{component.nameOfComponent}</option>
              ))}
          </select>
          <label>Enter Error Code If Any Error Code Represent</label>
          <input
            type="text"
            placeholder="Enter Error Code"
            className="form-control"
            value={errorCode}
            onChange={(e) => setErrorCode(e.target.value)}
          />

          <label>Type Your Problem</label>
          <textarea
            type="text"
            className="form-control"
            placeholder="Type Your Problem Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <input
            type="text"
            className="form-control mt-2"
            style={{ fontSize: 'small' }}
            value={"Your Issue Will Be Sent to 'carbynetech@gmail.com'"}
          />

          <button type="button" className="btn d-block" onClick={handleSubmit}>
            Submit Request
          </button>
        </div>
      )}
      <i className="fas fa-envelope fa-2x"></i>
    </div>
  );
};

export default SpeedDialIcon;
