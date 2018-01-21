import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeImage from "../assets/home.png"
import {
	Route,
} from 'react-router-dom'
import App from "./App";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export class ItemForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	render() {
		return (
			<div>
				<div className="go_to_home">
					<a href="/">
						<img src={HomeImage} width={25}/>
					</a>
				</div>
				<Route exact path="/" component={App}/>
				<Route path="/login" component={LoginForm}/>
				<Route path="/register" component={RegisterForm}/>
				{this.props.children}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.dataReducer.users,
		auth: state.authReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);