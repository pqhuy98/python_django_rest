import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/data';
import Comment from './Comment';
import CommentForm from './CommentForm';

class Item extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
	}

	findComments() {
		var url = this.props.item.url;
		var res = [];
		this.props.comments.map((c) => {
			if (c.to == url) {
				res.push(c);
			}
		});
		return res;
	}

	getUser(url) {
		var res = {};
		this.props.users.map((u) => {
			if (u.url == url) {
				res = u;
			}
		});
		return res;
	}

	onDelete() {
		this.props.dispatch(a.deleteData("items", this.props.item.url));
	}

	render() {
		var user = this.getUser(this.props.item.user);
		var cmts = this.findComments();
		return (
			<div className="item-container">
				<h3 className="item-info">
					<span className="item-name">
						<b>{this.props.item.name}</b>
					</span>
					--
					<span className="item-price">
						${this.props.item.price}
					</span>
					--
					<span className="item-amount">
						{this.props.item.amount} pieces
					</span>
				</h3>
				<div className="post-by">
					Posted by <b>{user.username}</b>.
				</div>
				<div>
				Comments :
				</div>
				<div className="comment-group">
					{
						cmts.map((x) => <Comment key={x.url} comment={x} />)
					}
				</div>

				<CommentForm item={this.props.item}/>
				{
					(user.username == this.props.auth.username) &&
					<div onClick={() => this.onDelete()} className="delete" title="Delete">×</div>
				}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		users: state.dataReducer.users,
		comments: state.dataReducer.comments,
		auth: state.authReducer
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);