import React from 'react'
import PropTypes from 'prop-types'

function ButtonLoader({ className = '' }) {
  return (
    <>
      <span className={'bg-primary loading loading-dots text-white ' + className}></span>
    </>
  );
}

ButtonLoader.propTypes = {
  className: PropTypes.string
}

export default ButtonLoader

