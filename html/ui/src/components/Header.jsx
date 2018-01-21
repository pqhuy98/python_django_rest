import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Link,
} from 'react-router-dom';
import { SlideUp } from './Animation';
import { TransitionGroup } from 'react-transition-group'

import * as a from '../actions/auth';

import Item from './Item';
import ItemForm from './ItemForm';
import Banner from '../assets/silk-road-banner.png';


class Header extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	logout() {
		this.props.dispatch(a.clearLogin())
	}

	render() {
		console.log(Banner)
		return (
			<div className="header-top">
				{this.props.auth.logged ?
					<div key="1" className="logout" onClick={() => this.logout()}>
						<span className="me">{this.props.auth.username}</span> -- Log out
					</div>
				:
					<Link key="1" to="/login" className="logout">Login</Link>
				}
				<br/>
				<div className="header"
					// style={{backgroundImage: `url(${Banner})`}}
				>
					<h3>THE SILK ROAD</h3>
					{this.props.auth.logged && <div>
						Hello, <span className="me">{this.props.auth.username}</span> !
					</div>}
 				</div>
			</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);