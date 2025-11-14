import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastProvider } from "./Components/common";
import AppRoutes from "./core/routes/AppRoutes";
import GlobalLoader from "./Components/common/GlobalLoader";

/**
 * Root Application Component
 * - Configures global providers (toast, loader)
 * - Initializes client-side routing
 */
const App: React.FC = () => (
  <>
    <ToastProvider />
    <GlobalLoader />
    <Router>
      <AppRoutes />
    </Router>
  </>
);

export default App;
