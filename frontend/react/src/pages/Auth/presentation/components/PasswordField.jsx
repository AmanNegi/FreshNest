import React, { useState } from 'react';

import { EyeOff, Eye } from 'lucide-react';

import PropTypes from 'prop-types';

const PasswordField = ({ handleFieldChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex flex-col w-[100%] ">
      <label htmlFor="input">Password</label>
      <div className="flex flex-row items-end">
        <input
          name="password"
          onChange={handleFieldChange}
          type={passwordVisible ? 'text' : 'password'}
          className="input input-bordered w-full mt-2"
        ></input>
        <button
          // className="myButton ml-2"
          className="ml-2 btn btn-primary"
          onClick={togglePasswordVisibility}
        >
          {passwordVisible ? <EyeOff /> : <Eye />}
        </button>
      </div>
    </div>
  );
};

PasswordField.propTypes = {
  handleFieldChange: PropTypes.func.isRequired
};

export default PasswordField;
