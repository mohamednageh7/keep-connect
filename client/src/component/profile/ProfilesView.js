import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../spinner/Spinner';
import { getUsers } from '../../action/auth';
import ProfilesListView from './ProfilesListView';

const ProfilesView = ({ auth: { users, loading }, getUsers }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className='container'>
          <h1 className='large text-primary'>Add Friends</h1>
          <p className='lead'>
            <i className='fas fa-users'></i> Start make new friends now
          </p>
          <div className='profiles'>
            {users.length > 0 ? (
              users.map((user) => (
                <ProfilesListView key={user._id} user={user} />
              ))
            ) : (
              <h4>No users found ..</h4>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

ProfilesView.propTypes = {
  getProfiles: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { getUsers })(ProfilesView);
