import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../action/profile';
import { Spinner } from '../spinner/Spinner';
import Alert from '../layout/Alert';
import ProfileAction from './ProfileAction';
import Experience from '../profile data view/Experience';
import Education from '../profile data view/Education';
import { deleteAccount } from '../../action/profile';

const Profile = ({
  profile: { profile, loading },
  getCurrentProfile,
  auth: { user },
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <section className='container'>
      {loading && profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Alert />
          <h1 className='large test-primary mt-5'>Profile </h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welecome {user && user.name}
          </p>
          {profile !== null ? (
            <Fragment>
              <ProfileAction />
              <Experience experiences={profile.experience} />
              <Education educations={profile.education} />
              <div className='my-2'>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteAccount()}
                >
                  <i className='fas fa-user-minus'></i> Delete My Account
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <p>You have not yet setup a profile, please add some info</p>
              <Link to='/create-profile' className='btn btn-primary my-1'>
                Create Profile
              </Link>
            </Fragment>
          )}
        </Fragment>
      )}
    </section>
  );
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Profile
);
