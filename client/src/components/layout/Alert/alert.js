import React, { useContext } from 'react';
import AlertContext from '../../../context/alert/alertContext';

const Alert = () => {
  const { alert } = useContext(AlertContext);

  return (
    alert.length > 0 &&
    alert.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <i className={`fas fa-info-circle`} />
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
