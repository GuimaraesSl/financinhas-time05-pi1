import React from 'react'
import './InputField.style.css'

interface InputFieldProps {
  label: string
  type: string
  id: string
  name: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField: React.FC<InputFieldProps> = ({ label, type, id, name, value, onChange }) => {
  return (
    <div className="inputField">
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} name={name} value={value} onChange={onChange} />
    </div>
  )
}

export default InputField
