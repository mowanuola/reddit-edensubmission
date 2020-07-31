import React from "react";
import { Search } from "./components/Search";
import { Navbar } from "./layout";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Search />
    </div>
  );
}

export default App;
