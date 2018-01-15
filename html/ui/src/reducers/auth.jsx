import * as a from '../actions/auth';

const initialState = {
	username: localStorage.getItem("username"),
	password: localStorage.getItem("password"),
	logged: localStorage.getItem("logged"),
};

export default (state = initialState, action ) => {
	switch (action.type) {
		case a.LOGIN: {
			localStorage.setItem("username", action.username);
			localStorage.setItem("password", action.password);
			localStorage.setItem("logged", true);
			return Object.assign({}, {
				username: action.username,
				password: action.password,
				logged: true,
			})
		}
		case a.CLEAR_LOGIN: {
			localStorage.removeItem("username");
			localStorage.removeItem("password");
			localStorage.removeItem("logged");
			return Object.assign({}, {
				username: "",
				password: "",
				logged: false,
			})
		}
		default: {
			return state;
		}
	}
}
