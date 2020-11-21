import React, { useContext } from 'react'
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {


  const alertContext = useContext(AlertContext)


  let uniqueAlertsMsg = [...new Set(alertContext.alerts.map(x => x.msg))];
  let uniqueAlertsType = [...new Set(alertContext.alerts.map(x => x.type))];
  let uniqueAlertsId = [...new Set(alertContext.alerts.map(x => x.id))];

  return (
    alertContext.alerts.length > 0 && uniqueAlertsMsg.map(alert => (
      <div key={uniqueAlertsId} className={`alert alert-${uniqueAlertsType}`}>
        <i className="fas fa-info-circle"></i> {uniqueAlertsMsg}
      </div>

    ))
  )

};
export default Alerts;
