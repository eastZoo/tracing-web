import React from "react";
import "./App.css";
import FileUpload from "./components/molecules/FileUpload";
import SvgPointSelector from "./components/molecules/SvgPointSelector";

function App() {
  return (
    <div className="App">
      <FileUpload project="tracing-app" />
      <SvgPointSelector />
    </div>
  );
}

export default App;
