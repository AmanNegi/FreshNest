import React from 'react'
import { Circles } from "react-loader-spinner";

function ButtonLoader() {
  return (
    <>
      <Circles
        height="30"
        width="30"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </>
  );
}

export default ButtonLoader
