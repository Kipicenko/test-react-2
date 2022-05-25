import React from 'react';
import Header from "./components/Header";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <div className="wrapper">
        <Header/>
        <Main/>
        <Sidebar/>
    </div>
  );
}

export default App;
