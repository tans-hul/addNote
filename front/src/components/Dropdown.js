import React, { useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleChange = (event) => {
    const {value} = event.target;
    onSelect(value);
    // console.log(End);
    // console.log(selectedOptions)
    // You can perform any necessary action here based on the selected start option
  }

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };
  

  return (
    <div className="dropdown">
      {/* <button onClick={handleClick} className="dropdown-toggle">
        {isOpen ? 'Close' : 'Open'}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li key={option._id} onClick={() => handleSelect(option._id)}>
              {option}
            </li>
          ))}
        </ul>
      )} */}
      <label htmlFor="startDropdown">End:</label>
      <select id="startDropdown" name='start' value={options[0].title} onChange={handleChange}>
        {options[0].title}
      </select>
    </div>
  );
};

export default Dropdown;