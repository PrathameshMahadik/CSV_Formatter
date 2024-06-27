import React from "react";
import ErrorBoundary from "./modules/ErrorBoundry/ErrorBoundry";
import MainRoutes from "./routes/MainRoutes";

const App = () => {
  return (
    <ErrorBoundary>
      <MainRoutes />
    </ErrorBoundary>
  );
};

export default App;
