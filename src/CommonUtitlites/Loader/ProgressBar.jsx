import React, { useState, useEffect } from 'react';
// import './ProgressBar.css';
import styles from './ProgressBar.module.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 90) {
        setProgress(progress + 10);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    // <div className="loader-container">
    //   <div className="progress-container">
    //     <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    //     {/* <div className="progress-bar" style={{ width: `100%` }}></div> */}
    //   </div>
    // </div>
    <div className={styles['loader-container']}>
      <div className={styles['progress-container']}>
        <div className={styles['progress-bar']} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

export default ProgressBar;
