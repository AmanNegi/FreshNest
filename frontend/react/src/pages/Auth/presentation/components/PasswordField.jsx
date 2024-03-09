import React, { useState } from 'react'
import { BiHide, BiShow } from 'react-icons/bi'

const PasswordField = ({ handleFieldChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

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
          {passwordVisible ? <BiHide /> : <BiShow />}
        </button>
      </div>
    </div>
  )
}

export default PasswordField
