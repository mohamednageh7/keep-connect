import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../action/profile';

const AddExperience = ({ addExperience, history }) => {
  const [formDate, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formDate;

  const onChange = (e) =>
    setFormData({ ...formDate, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formDate, history);
  };
  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary mt-5'>Add An Experience</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any developer/programming
          positions that you have had in the past
        </p>
        <small>* = required field</small>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Job Title'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Company'
              name='company'
              value={company}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              value={location}
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
                value={current}
                checked={current}
                onChange={() => {
                  setFormData({ ...formDate, current: !current });
                  toggleDisabled(!toDateDisabled);
                }}
              />{' '}
              Current Job
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
              placeholder='Job Description'
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
