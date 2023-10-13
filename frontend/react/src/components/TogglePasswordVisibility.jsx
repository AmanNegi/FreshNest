import React from 'react'
import { BiHide, BiShow } from "react-icons/bi";

function TogglePasswordVisibility({
  passwordVisible,
  togglePasswordVisibility,
}) {
  return (
    <div>
      <button
        className="ml-2 btn btn-primary"
        onClick={togglePasswordVisibility}
      >
        {passwordVisible ? <BiHide /> : <BiShow />}
      </button>
    </div>
  );
}

export default TogglePasswordVisibility
