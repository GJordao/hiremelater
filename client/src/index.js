// React
import React from "react";
import ReactDOM from "react-dom";
// Redux
import { Provider } from "react-redux";
import store from "./config/store";
// Components
import Home from "./screens/Home";

const App = () => {
    return (
        <Provider store={store}>
            <Home />
        </Provider>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
