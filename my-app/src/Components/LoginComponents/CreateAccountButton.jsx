import React from "react";
import { handleAuthentication } from "./Authenication.jsx";
import "./CreateAccountButton.css";

const CreateAccountButton = ({ email, password }) => {
  const handleCreateAccount = () => {
    handleAuthentication(email, password, "", "create");
  };

  return (
    <button className="create-account-button" onClick={handleCreateAccount} disabled={!email || !password}>
      Create Account
    </button>
  );
};

export default CreateAccountButton;
