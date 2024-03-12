import React from 'react';
import { ClickActionButton } from './Button';

const QueryError = ({ error, onClick }) => {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center">
      <h1>An Error Occured</h1>
      <p className="mb-4">{error.message}</p>
      <div>
        <ClickActionButton onClick={onClick} text="Try again" />
      </div>
    </div>
  );
};

export default QueryError;
