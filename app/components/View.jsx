import React, { PropTypes } from 'react';
import classNames from 'classnames';

const View = ({ icon, isActive, onClick }) => (
  <button className={classNames('btn btn-secondary', { active: isActive })}
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
