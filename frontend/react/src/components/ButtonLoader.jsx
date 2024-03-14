import React from 'react';

function ButtonLoader({ className = '' }) {
  return (
    <>
      <span className={'bg-primary loading loading-dots text-white ' + className}></span>
    </>
  );
}

export default ButtonLoader;
