import React from 'react';
// import './Loader.css'; // Create a corresponding CSS file for styling
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles['loader-container']}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;