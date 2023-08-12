import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { useAppResources } from "./hooks/useAppResources";
import { Boot } from "./views/Boot";

import Home from "./views/Home";
import { AppContextProvider } from "./store";

const App = () => {
  const { loadResources, loaded } = useAppResources();

  useEffect(() => {
    loadResources();
  }, []);

  if (!loaded) {
    return <Boot />;
  }

  return (
    <AppContextProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Home />
        </div>
      </Router>
    </AppContextProvider>
  );
};

export default App;
