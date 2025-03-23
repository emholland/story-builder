import React from "react";
import "./Username.css";

const Username = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="username-field"
      placeholder="Username"
      value={value}
      onChange={onChange}
      aria-label="Username"
    />
  );
};

export default Username;
