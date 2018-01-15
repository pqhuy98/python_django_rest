import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/data';

class Comment extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
		};
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
		this.props.dispatch(a.deleteData("comments", this.props.comment.url));
	}

	render() {
		var writer = this.getUser(this.props.comment.writer);
		return (
			<div className="comment-container">
				<div className="comment-writer">
					<span className="comment-writer-username">
						{writer.username}
					</span> wrote :
				</div>
				<div className="comment-subject">
					{this.props.comment.header} ({this.props.comment.score.toFixed(1)} / 5.0)
				</div>
				<div className="item-body">
					{this.props.comment.body}
				</div>
				{
					(writer.username == this.props.auth.username) &&
					<div onClick={() => this.onDelete()} className="delete" title="Delete">×</div>
				}
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment);