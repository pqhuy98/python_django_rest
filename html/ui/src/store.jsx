import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { install, combineReducers } from 'redux-loop';
import axios from 'axios';

import authReducer from './reducers/auth';
import dataReducer from './reducers/data';
import * as a from './actions/auth';

const reducer = combineReducers({
	dataReducer,
	authReducer,
});

const store = createStore(
	reducer,
	compose(
		applyMiddleware(thunkMiddleware),
		install()
	)
);


export default store;

function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ')
			c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0)
			return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}

axios.interceptors.request.use(config => {
	var username = store.getState().authReducer.username;
	var password = store.getState().authReducer.password
	config.headers["Authorization"] = "Basic " + btoa(`${username}:${password}`);
	config.headers["X-CSRFToken"] = readCookie("csrftoken");
	config.headers["Content-Type"] = "application/json;charset=UTF-8";
	return config
});

axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	if (error.status == 403) {
		store.dispatch(a.clearLogin());
	} else {
		return Promise.reject(error);
	}
});

