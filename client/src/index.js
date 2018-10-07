// React
import React from "react";
import ReactDOM from "react-dom";
// Config
import registerServiceWorker from "./config/registerServiceWorker";
// Components
import Home from "./screens/Home";

ReactDOM.render(<Home />, document.getElementById("root"));
registerServiceWorker();
