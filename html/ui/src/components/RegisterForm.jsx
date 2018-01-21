import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Link,
	Redirect,
} from 'react-router-dom';

import * as a from '../actions/auth';
import * as aData from '../actions/data';

class RegisterForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			username: "",
			password: "",
			email: "",
		};
	}

	handleChange(key, e) {
		this.setState({
			...this.state,
			[key]: e.target.value,
		})
	}

	onSubmit() {
		console.log(this.props)
		this.props.dispatch(a.register(this.state)).then((dispatch) => {
			this.props.dispatch(a.checkLogin());
		}).then((dispatch) => {
			this.props.dispatch(aData.getData("users"));
			this.props.dispatch(aData.getData("items"));
			this.props.dispatch(aData.getData("comments"));
		});
	}

	render() {
		return (
			<div className="login-form">
				{
					this.props.auth.logged && <Redirect to="/"/>
				}
				<Link to="/" style={{float:"left"}}>Home</Link>
				<Link to="/login" style={{float:"right"}}>Login</Link>
				<h1>
				Register
				</h1>
				<div className="item-form-name">
					<span className="price-label">Username : </span>
					<input type="text" placeholder="Name"
						value={this.state.username}
						onChange={(e) => this.handleChange("username", e)}
					/>
				</div>
				<div className="item-form-name">
					<span className="price-label">Email : </span>
					<input type="text" placeholder="Email"
						value={this.state.email}
						onChange={(e) => this.handleChange("email", e)}
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
					Register
				</button><br/>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);