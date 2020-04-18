import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Spinner } from '../spinner/Spinner';
import { getFreinds } from '../../action/friends';
import ProfilesListView from './ProfilesListView';
import socket from '../../utils/socketConnect';

const FriendsListView = ({ auth: { users, loading }, friends, getFreinds }) => {
  useEffect(() => {
    socket.on('get friends', (data) => {
      getFreinds(data);
    });
    socket.on('delete friends', (data) => {
      getFreinds(data);
    });
    getFreinds();
  }, [getFreinds]);
  console.log(friends);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <section className='container'>
          <h1 className='large text-primary mt-5'>My Friends</h1>
          <div className='profiles'>
            {friends.friendList.length > 0 ? (
              friends.friendList.map((friend) => (
                <ProfilesListView key={friend._id} user={friend} />
              ))
            ) : (
              <h4>No friends added yet ..</h4>
            )}
          </div>
        </section>
      )}
    </Fragment>
  );
};

FriendsListView.propTypes = {
  auth: PropTypes.object.isRequired,
  getFreinds: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  friends: state.friends,
});

export default connect(mapStateToProps, { getFreinds })(FriendsListView);
