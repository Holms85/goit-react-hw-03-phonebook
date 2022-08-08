import React from 'react';
import PropTypes from 'prop-types';
import style from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <div className={style.flex}>
      <label className={style.label}>Find contact by name</label>
      <input
        className={style.input}
        type="text"
        value={filter}
        onChange={onChange}
      ></input>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;