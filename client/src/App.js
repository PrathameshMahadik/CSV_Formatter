import React from "react";
import MainRoutes from "./routes/MainRoutes";
import ErrorBoundary from "./modules/ErrorBoundry/ErrorBoundry";

const App = () => {
  return (
    <ErrorBoundary>
      <MainRoutes />
    </ErrorBoundary>
  );
};

export default App;
