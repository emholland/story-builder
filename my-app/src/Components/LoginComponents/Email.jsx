import React from "react";
import "./Email.css";

const Email = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="email-field"
      placeholder="Email"
      value={value}
      onChange={onChange}
      aria-label="Email"
    />
  );
};

export default Email;
