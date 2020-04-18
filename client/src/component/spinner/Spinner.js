import React from 'react';
import spinner from './spinner.gif';

export const Spinner = () => (
  <section className='container'>
    <img
      src={spinner}
      style={{ width: '200px', position: 'fixed', top: '45%', left: '45%' }}
      alt='Loading...'
    />
  </section>
);
