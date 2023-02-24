import React, { FC } from "react";

interface IProps {
  error: Error;
  resetErrorBoundary: any;
}

const FallbackScreen: FC<IProps> = ({ error, resetErrorBoundary }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default FallbackScreen;
