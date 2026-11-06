import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { useAppResources } from "./hooks/useAppResources";
import { Boot } from "./views/Boot";

import Home from "./views/Home";
import { AppContextProvider } from "./store";

const App = () => {
  const { loadResources, loaded } = useAppResources();

  useEffect(() => {
    loadResources();
  }, []);

  // Keep the OS store mounted during boot so HMR / remounts don't wipe session state.
  return (
    <AppContextProvider>
      {!loaded ? (
        <Boot />
      ) : (
        <Router>
          <div className="flex flex-col h-screen">
            <Home />
          </div>
        </Router>
      )}
    </AppContextProvider>
  );
};

export default App;
