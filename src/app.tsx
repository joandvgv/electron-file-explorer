import * as React from "react";
import * as ReactDOM from "react-dom";
import { FileExplorer } from "./components/main";
import "antd/dist/antd.css";

function render() {
  ReactDOM.render(<FileExplorer />, document.getElementById("root"));
}

render();
