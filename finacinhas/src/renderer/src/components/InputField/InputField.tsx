import React from 'react';
import './InputField.style.css';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, name }) => {
  return (
    <div className="inputField">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} />
    </div>
  );
};

export default InputField;
