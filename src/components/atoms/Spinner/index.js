import React from 'react';
import './spinner.css';

const Spinner = () => {
  return (
    <div id="loader-wrapper">
      <div id="loader"></div>
      <div className="loader-section section-left"></div>
      <div className="loader-section section-right"></div>
      <div id="content">
        <h2>Please wait</h2>
      </div>
    </div>
  );
};

export default Spinner;
