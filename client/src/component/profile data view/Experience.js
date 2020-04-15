import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Momment from 'react-moment';
import { connect } from 'react-redux';
import { deleteExperience } from '../../action/profile';

const Experience = ({ experiences, deleteExperience }) => {
  const experience = experiences.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Momment format='YYYY/MM/DD'>{exp.from}</Momment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Momment format='YYYY/MM/DD'>{exp.to}</Momment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      {experiences.length > 0 && (
        <Fragment>
          <h2 className='my-2'>Experience Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>Company</th>
                <th className='hide-sm'>Title</th>
                <th className='hide-sm'>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{experience}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Experience.propTypes = {
  experiences: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
