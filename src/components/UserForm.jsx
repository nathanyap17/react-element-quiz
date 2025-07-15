import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function UserForm({ onSubmit }) {
  const [inputName, setInputName] = useState('');
  const context = useContext(UserContext);
  const navigate = useNavigate();

  // Debug: Log the context to verify it's not undefined
  console.log('UserContext:', context);

  if (!context) {
    throw new Error('UserForm must be used within a UserProvider');
  }

  const { setName } = context;

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputName.trim()) return; // Prevent submission if name is empty
    setName(inputName.trim()); // Set the name in context
    onSubmit(inputName.trim());
    navigate('/quiz'); // Navigate to /quiz using React Router
  }

  const handleChange = (e) => {
    setInputName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">
        Name:
      </label>
      <input
        type="text"
        name="name"
        value={inputName}
        onChange={handleChange}
        placeholder="Enter your name"
        required
      />
      <br />
      <br />
      <button type="submit">Submit</button> 
    </form>
  );
}