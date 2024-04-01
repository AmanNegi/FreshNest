import React from 'react';
import errorImage from '../assets/error.png';
import NavigationButton from '../components/Button';

const ErrorPage = () => {
  return (
    <div className="h-[100vh] w-full flex flex-col items-center ">
      <div className="h-10"></div>
      <img className="h-[50vh]" src={errorImage} alt="" />
      <h1 className="text-5xl">Error 404</h1>
      <h5 className="mb-4">Page Not Found</h5>
      <NavigationButton text="Go to Login Page" path="/auth" />
    </div>
  );
};

export default ErrorPage;
