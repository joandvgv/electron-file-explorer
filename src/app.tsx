import * as React from "react";
import * as ReactDOM from "react-dom";
import { FileExplorer } from "./components/main";
import "antd/dist/antd.variable.min.css";
import { ConfigProvider } from "antd";
import colors from "./utils/colors";

ConfigProvider.config({
  theme: colors,
});

function render() {
  ReactDOM.render(<FileExplorer />, document.getElementById("root"));
}

render();
