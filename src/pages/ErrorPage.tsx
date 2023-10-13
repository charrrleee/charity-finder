import React from "react";
import { useRouteError, ErrorResponse } from "react-router-dom";

const ErrorPage: React.FC = () => {
  const error: ErrorResponse = useRouteError();

  return (
    <div id="error-page" className="text-center p-8">
      <h1 className="text-3xl font-bold mb-4">Oops!</h1>
      <p className="text-lg mb-2">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="italic">{error?.status || error?.data}</p>
    </div>
  );
}

export default ErrorPage;
