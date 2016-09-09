import React, { PropTypes } from 'react';

const View = ({ icon, isActive, onClick }) => (
  <button className={`btn btn-secondary ${isActive ? 'active' : ''}`}
   onClick={onClick}
  > <i className={icon} />
  </button>
);

View.propTypes = {
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default View;
