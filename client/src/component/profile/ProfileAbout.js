import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  about: {
    bio,
    hoppys,
    user: { name },
  },
}) => (
  <div className='profile-about bg-light p-2'>
    {bio && (
      <Fragment>
        <h2 className='text-primary'>{name.trim().split(' ')[0]}s Bio</h2>
        <p>{bio}</p>
        <div className='line'></div>
      </Fragment>
    )}

    <h2 className='text-primary'>Hoppys</h2>
    <div className='skills'>
      {hoppys.map((hoppy, index) => (
        <div className='p-1' key={index}>
          <i className='fa fa-check'></i> {hoppy}
        </div>
      ))}
    </div>
  </div>
);

ProfileAbout.propTypes = {
  about: PropTypes.object.isRequired,
};

export default ProfileAbout;
