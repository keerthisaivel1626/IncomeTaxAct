import React from "react";
import HomeScreen from "./screens/HomeScreen";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Nav from "./Nav";

const reducer = (
  state = {
    menu: "closeMenu",
  },
  command
) => {
  switch (command.type) {
    case "OPENMENU":
      return { menu: "openMenu" };
    case "CLOSEMENU":
      return { menu: "closeMenu" };
    default:
      return state;
  }
};

const database = createStore(reducer);

const App = () => (
  <Provider store={database}>
    <Nav />
  </Provider>
);

export default App;
