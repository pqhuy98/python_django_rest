import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/auth';

import Item from './Item';
import ItemForm from './ItemForm';
import LoginForm from './LoginForm';


class App extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	logout() {
		this.props.dispatch(a.clearLogin())
	}

	render() {
		return (
			(this.props.auth.logged) ?
				<div className="item-list-container">
					<ItemForm />
					<h1>Item list</h1>
					{this.props.items.map((x, idx) => {
						return <Item key={x.url} item={x}/>
					})}
					<div className="logout" onClick={() => this.logout()}>Log out</div>
				</div>
			: <LoginForm />
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.dataReducer.items,
		auth: state.authReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);