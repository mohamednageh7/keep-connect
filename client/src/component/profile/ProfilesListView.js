import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import defaultImage from './user.png';
import { connect } from 'react-redux';

const ProfilesListView = ({ user: { _id, name, avatar }, addFriend }) => {
  return (
    <div className='profile bg-light'>
      <img
        src={avatar === null ? defaultImage : avatar}
        alt=''
        className='round-img'
      />
      <div>
        <h2>{name}</h2>
        {/* <p>
          {location} {company && <span> at {company}</span>}
        </p> */}
        {/* <p className='my-1'>{location && <span>{location}</span>}</p> */}
        <Link to={`/profile/${_id}`} className='btn btn-primary'>
          View Profile
        </Link>
      </div>
      {/* <ul>
        {hoppys.slice(0, 4).map((hoppy, index) => (
          <li key={index} className='text-primary'>
            {' '}
            <i className='fas fa-check'></i> {hoppy}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

ProfilesListView.propTypes = {
  users: PropTypes.object,
  // addFriend: PropTypes.func.isRequired,
};

export default connect()(ProfilesListView);
