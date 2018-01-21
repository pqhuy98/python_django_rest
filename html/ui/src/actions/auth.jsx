import * as config from '../config';
import axios from 'axios';
import store from '../store';

export const LOGIN = "LOGIN"
export function login(auth) {
	return {
		type: LOGIN,
		username: auth.username,
		password: auth.password,
	}
}
export const REGISTER = "REGISTER"
export function register(info) {
	return (dispatch) => axios.post(config.APIBase+"/register/", info)
		.then((res) => {
			return dispatch(login(info))
		})
		.catch((res) => {
			console.log("WTF");
			alert(JSON.stringify(res.response.data));
		});
}
export const CHECK_LOGIN = "CHECK_LOGIN"
export function checkLogin() {
	return (dispatch) => {
		var auth = {
			username: store.getState().authReducer.username,
			password: store.getState().authReducer.password,
			email: "???"
		}
		axios.post(config.APIBase+"/login/", auth)
			.then((res) => {
				dispatch(setLogin());
			})
			.catch((res) => {
				alert("Wrong username or password !");
			});
	}	
}
export const SET_LOGIN = "SET_LOGIN"
export function setLogin() {
	return {
		type: SET_LOGIN,
	}
}
export const CLEAR_LOGIN = "CLEAR_LOGIN"
export function clearLogin() {
	return {
		type: CLEAR_LOGIN,
	}
}
