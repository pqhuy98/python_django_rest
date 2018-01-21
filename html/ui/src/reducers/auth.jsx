import * as a from '../actions/auth';

const initialState = {
	username: localStorage.getItem("username"),
	password: localStorage.getItem("password"),
	logged: localStorage.getItem("logged") || false,
	provideAuth: localStorage.getItem("logged"),
};

export default (state = initialState, action ) => {
	switch (action.type) {
		case a.LOGIN: {
			localStorage.setItem("username", action.username);
			localStorage.setItem("password", action.password);
			return Object.assign({}, state, {
				username: action.username,
				password: action.password,
				provideAuth: true,
			})
		}
		case a.SET_LOGIN: {
			localStorage.setItem("logged", true);
			return Object.assign({}, state, {
				provideAuth: true,
				logged: true,
			})
		}
		case a.CLEAR_LOGIN: {
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			localStorage.removeItem("logged");
			return Object.assign({}, state, {
				username: "",
				password: "",
				logged: false,
				provideAuth: false,
			})
		}
		default: {
			return state;
		}
	}
}
