import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/auth';
import * as aData from '../actions/data';

class LoginForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			username: "root",
			password: "BigPassword",
		};
	}

	handleChange(key, e) {
		this.setState({
			...this.state,
			[key]: e.target.value,
		})
	}

	onSubmit() {
		this.props.dispatch(a.login(this.state.username, this.state.password))
		this.props.dispatch(aData.getData("users"));
		this.props.dispatch(aData.getData("items"));
		this.props.dispatch(aData.getData("comments"));
	}

	render() {
		return (
			<div className="login-form">
				<h1>
				Login :
				</h1>
				<div className="item-form-name">
					<span className="price-label">Username : </span>
					<input type="text" placeholder="Name"
						value={this.state.username}
						onChange={(e) => this.handleChange("username", e)}
					/>
				</div>
				<div className="item-form-name">
					<span className="price-label">Password : </span>
					<input type="password" placeholder="Password"
						value={this.state.password}
						onChange={(e) => this.handleChange("password", e)}
					/>
				</div>
				<button onClick={() => this.onSubmit()} className="comment-form-submit">
					Post !
				</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);