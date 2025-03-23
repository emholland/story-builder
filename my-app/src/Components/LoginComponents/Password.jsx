import React from "react";
import "./Password.css";

const Password = ({ value, onChange }) => {
  return (
    <input
      type="password"
      className="password-field"
      placeholder="Password"
      value={value}
      onChange={onChange}
      aria-label="Password"
    />
  );
};

export default Password;
