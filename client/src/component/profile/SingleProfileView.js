import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import { getProfileById } from '../../action/profile';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import { addFriend, getFreinds, removeFreind } from '../../action/friends';
import socket from '../../utils/socketConnect';

const SingleProfileView = ({
  getProfileById,
  addFriend,
  getFreinds,
  removeFreind,
  profile: { profile, loading },
  auth,
  friends: { friendList },
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    socket.on('delete friends', (data) => {
      getFreinds(data);
    });
    getFreinds();
  }, [getProfileById]);
  let id = match.params.id;

  const handleOnClick = (e) => {
    addFriend(id);
  };
  const handleRemoveFriends = (e) => {
    removeFreind(auth.user._id, id);
    // console.log(user);
  };
  return (
    <section className='container'>
      {profile === null || loading ? (
        <p className='lead'>
          <i className='fas fas-user'></i> User has no profile{' '}
        </p>
      ) : (
        <Fragment>
          <Link to='/add-friends' className='btn btn-light'>
            Back To Friends List
          </Link>

          {!friendList.map((item) => item.user).includes(id) ||
          friendList.length === 0 ? (
            <button
              onClick={(e) => handleOnClick(e)}
              className='btn btn-primary'
            >
              Follow
            </button>
          ) : (
            <button
              onClick={(e) => handleRemoveFriends(e)}
              className='btn btn-primary'
            >
              Following
            </button>
          )}
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to='/edit-profile' className='btn btn-blue'>
                Edit Profile{' '}
              </Link>
            )}
          <div className='profile-grid my-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout about={profile} />
            <div className='profile-exp bg-white p-2'>
              <h2 className='text-primary'>Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((exp) => (
                    <ProfileExperience key={exp._id} exp={exp} />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentails</h4>
              )}
            </div>

            <div className='profile-edu bg-white p-2'>
              <h2 className='text-primary'>Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((edu) => (
                    <ProfileEducation key={edu._id} edu={edu} />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentails</h4>
              )}
            </div>
          </div>
        </Fragment>
      )}
    </section>
  );
};

SingleProfileView.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  addFriend: PropTypes.func.isRequired,
  getFreinds: PropTypes.func.isRequired,
  removeFreind: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  friends: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  friends: state.friends,
});

export default connect(mapStateToProps, {
  getProfileById,
  addFriend,
  getFreinds,
  removeFreind,
})(SingleProfileView);
