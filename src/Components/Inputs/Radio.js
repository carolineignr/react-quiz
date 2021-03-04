import React from 'react';

export const Radio = ({ option, checked, onChange }) => {
  return (
    <label>
      <p>
        <input
          type='radio'
          value={option}
          name={option}
          checked={checked}
          onChange={onChange}
        />
        {option}
      </p>
    </label>
  )
}

export default Radio;
