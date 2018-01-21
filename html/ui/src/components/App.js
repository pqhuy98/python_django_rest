import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Link,
} from 'react-router-dom';
import { SlideUp } from './Animation';
import { TransitionGroup } from 'react-transition-group'

import * as a from '../actions/auth';

import Header from './Header';
import Item from './Item';
import ItemForm from './ItemForm';


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
		console.log(this.props.auth)
		return (
			<div>
				<Header/>
				<div className="item-list-container">
					{this.props.auth.logged && <div>
							<h1> Post a new item</h1>
							<ItemForm key="0"/>
						</div>
					}
					<h1>Item list</h1>
					<TransitionGroup>
						{this.props.items.map((x, idx) => {
							return <SlideUp key={x.url}>
								<Item key={x.url} item={x}/>
							</SlideUp>
						})}
					</TransitionGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);