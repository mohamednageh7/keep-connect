import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alert }) => (
  <Fragment>
    {alert !== null &&
      alert.length > 0 &&
      alert.map((item) => (
        <div key={item.id} className={`alert alert-${item.alertType}`}>
          {item.msg}
        </div>
      ))}
  </Fragment>
);

Alert.propTypes = {
  alerts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  alert: state.alert,
});

export default connect(mapStateToProps)(Alert);
