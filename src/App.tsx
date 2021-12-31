import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { useAppResources } from "./hooks/useAppResources";
import { Boot } from "./views/Boot";

import Home from "./views/Home";

const App = () => {
  const { loadResources, loaded } = useAppResources();

  useEffect(() => {
    loadResources();
  },[])

  if (!loaded) {
    return (
        <Boot />
    );
  }
 

  return (
    <RecoilRoot>
      <Router>
        <div className="flex flex-col h-screen">
          <Home />
        </div>
      </Router>
    </RecoilRoot>
  );
};

export default App;
