import React from 'react';

const Input = props => {
  return (
    <div>
    
      <input
        type={props.type}
        step={props.step}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default Input;
