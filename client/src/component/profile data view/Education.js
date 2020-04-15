import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Momment from 'react-moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../action/profile';

const Education = ({ educations, deleteEducation }) => {
  const education = educations.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Momment format='YYYY/MM/DD'>{edu.from}</Momment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Momment format='YYYY/MM/DD'>{edu.to}</Momment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className='btn btn-danger'
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      {education.length > 0 && (
        <Fragment>
          <h2 className='my-2'>Education Credentials</h2>
          <table className='table'>
            <thead>
              <tr>
                <th>school</th>
                <th className='hide-sm'>Degree</th>
                <th className='hide-sm'>Years</th>
                <th />
              </tr>
            </thead>
            <tbody>{education}</tbody>
          </table>
        </Fragment>
      )}
    </Fragment>
  );
};

Education.propTypes = {
  educations: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
