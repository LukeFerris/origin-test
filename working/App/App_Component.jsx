// ["App", "Component"]    
import React from "react";
import MainLayout_Component from "./MainLayout_Component";
import { Provider } from "react-redux";
import store from "./ReduxStore_Store";
import { BrowserRouter } from "react-router-dom";

export default function App_Component() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout_Component />
      </BrowserRouter>
    </Provider>
  );
}
