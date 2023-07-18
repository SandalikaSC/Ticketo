import React from "react";

const Input = ({
  name,
  label,
  classInput,
  classLabel,
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={name} className={classLabel}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classInput}
      />
    </div>
  );
};

export default Input;
