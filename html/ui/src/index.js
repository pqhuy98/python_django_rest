import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import Store from './store';
import * as a from './actions/data';

import registerServiceWorker from "./registerServiceWorker";
import axios from "axios"

import "./css/index.css";
import logo from './css/logo.svg';

import App from "./components/App";
import * as config from "./config"

function init() {
		Store.dispatch(a.getData("users"));
		Store.dispatch(a.getData("items"));
		Store.dispatch(a.getData("comments"));
}

init();

ReactDOM.render((
<Provider store={Store}>
	<App/>
</Provider>
), document.getElementById("root"));
registerServiceWorker();
