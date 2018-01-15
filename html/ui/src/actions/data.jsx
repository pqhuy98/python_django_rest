import * as config from '../config';
import axios from 'axios';


export const GET_DATA = "GET_DATA"
export function getData(key) {
	return (dispatch) => {
		axios.get(config.APIBase+"/"+key+"/")
			.then((res) => {
				dispatch(receiveData(key, res.data));
			})
			.catch((res) => { console.log("error get "+key, res)});
	}	
}


export const RECEIVE_DATA = "RECEIVE_DATA"
export function receiveData(key, data) {
	return {
		type: RECEIVE_DATA,
		key,
		data
	}
}

export const POST_DATA = "POST_DATA"
export function postData(key, data) {
	return (dispatch) => {
		axios.post(config.APIBase+"/"+key+"/", data)
			.then((res) => {
				dispatch(getData(key));
			})
			.catch((res) => { console.log("error post "+key, res)});
	}	
}

export const DELETE_DATA = "DELETE_DATA"
export function deleteData(key, url) {
	return (dispatch) => {
		axios.delete(url)
			.then((res) => {
				dispatch(getData(key));
			})
			.catch((res) => { console.log("error delete "+key, res)});
	}	
}