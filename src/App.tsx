import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import { useAppResources } from "./hooks/useAppResources";
import { Boot } from "./views/Boot";

import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

import Home from "./views/Home";
import { useWindowManager } from "./services/WindowManager";

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
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col h-screen">
          <Home />
        </div>
        </DndProvider>
      </Router>
    </RecoilRoot>
  );
};

export default App;
