import React, { useState } from 'react';
import PropTypes from 'prop-types'; // For prop validation
import './AddAgent.css';
import axios from "axios";


const AddAgent = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (agentData) => {
    try {
      // Send the agent data to the backend
      const response = await axios.post('http://localhost:5001/api/agents', agentData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Agent added successfully:', response.data);
    } catch (error) {
      console.error('Error adding agent:', error);
    }
  };

  const addAgent = () => {
    console.log("Adding agent:", selectedOption); // Log to see what was selected
    const agentData = { persona: selectedOption };

    handleSubmit(agentData);

    setSelectedOption("");
    setIsOpen(false); // Close the popup after adding

  }

  const options = [
    { value: 'Dr. Suess', label: 'Dr. Suess' },
    { value: 'Shakespeare', label: 'Shakespeare' },
    { value: 'Stephen King', label: 'Stephen King' },
  ];

  // Function to handle when an option is selected
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="popup-container">
      <button className="popup-button" onClick={togglePopup}>
        {children}
      </button>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={togglePopup}>
              &times;
            </button>

            <div className="agent-settings">
              <h2>Add an Agent</h2>
              <div className="dropdown-container">
                <label className="dropdown-label">Persona:</label>
                <select
                  value={selectedOption}
                  onChange={handleSelectChange}
                  className="dropdown-select"
                >
                  <option value="" disabled>Select a Persona</option>
                  {options.map((option, index) => (
                    <option key={index} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="add-agent-button" onClick={addAgent}>
              Add
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

// Prop validation (Optional but good practice)
AddAgent.propTypes = {
  children: PropTypes.node.isRequired, // Ensures 'children' is passed correctly
};

export default AddAgent;
