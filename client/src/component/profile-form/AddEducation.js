import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../action/profile';

const AddEducation = ({ addEducation, history }) => {
  const [formDate, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formDate;

  const onChange = (e) =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formDate, history);
  };
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary mt-5'>Add Education</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any school or bootcamp that
          you have
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='School'
              name='school'
              value={school}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Degree'
              name='degree'
              value={degree}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of study'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input
              type='date'
              name='from'
              value={from}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                value={from}
                checked={current}
                onChange={(e) => {
                  setFormData({ ...formDate, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Current School
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={(e) => onChange(e)}
              disabled={toDateDisabled ? 'disabled' : ''}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              value={description}
              onChange={(e) => onChange(e)}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/profile'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
