import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/data';

class ItemForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			name: "",
			price: 0,
			amount: 0,
		};
	}

	getMe() {
		var res = {};
		this.props.users.map((u) => {
			if (u.username == this.props.auth.username) {
				res = u;
			}
		});
		return res;
	}

	handleChange(key, e) {
		this.setState({
			...this.state,
			[key]: e.target.value,
		})
	}

	onSubmit() {
		var me = this.getMe();
		var cmt = {
			owner: me.url,
			name: this.state.name,
			price: this.state.price,
			amount: this.state.amount,
			sold: false,
		}
		this.props.dispatch(a.postData("items", cmt));
	}

	render() {
		return (
			<div className="item-form">
				<div className="item-form-name">
					<span className="price-label">Name : </span>
					<input type="text" placeholder="Name"
						value={this.state.name}
						onChange={(e) => this.handleChange("name", e)}
					/>
				</div>
				<div className="item-form-price">
					<span className="price-label">Price : </span>
					<input type="number" placeholder="$$$"
						value={this.state.price}
						onChange={(e) => this.handleChange("price", e)}
					/>
				</div>
				<div className="item-form-amount">
					<span className="amount-label">Amount : </span>
					<input type="number" placeholder="# of pieces"
						value={this.state.amount}
						onChange={(e) => this.handleChange("amount", e)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemForm);