export const LOGIN = "LOGIN"
export function login(username, password) {
	return {
		type: LOGIN,
		username,
		password,
	}
}
export const CLEAR_LOGIN = "CLEAR_LOGIN"
export function clearLogin() {
	return {
		type: CLEAR_LOGIN,
	}
}
