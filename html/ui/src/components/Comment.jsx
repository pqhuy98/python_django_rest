import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment"

import InputData from './InputData';
import { SlideUp } from './Animation';
import * as a from '../actions/data';

class Comment extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			dit: false,
			subject: this.props.comment.header,
			body: this.props.comment.body,
			score: this.props.comment.score,
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

	onSave(key, value) {
		var newCmt = Object.assign({}, this.props.comment);
		newCmt[key] = value;
		this.props.dispatch(a.putData("comments", newCmt));
	}

	onDelete() {
		this.props.dispatch(a.deleteData("comments", this.props.comment.url));
	}

	makeInput(type, key) {
		var user = this.getUser(this.props.comment.owner);
		return <InputData
			type={type}
			value={this.props.comment[key]}
			idkey={key}
			onSave={(idkey, value) => this.onSave(idkey, value)}
			editable={user.username == this.props.auth.username}
		/>
	}

	render() {
		var writer = this.getUser(this.props.comment.owner);
		var date = new Date(this.props.comment.created_at);
		return (
				<div className="comment-container">
					<div className="date">
						{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
					</div>
					<div className="comment-writer">
						<span className={"comment-writer-username "+(this.props.auth.username == writer.username && "me")} >
							{writer.username}
						</span> rated
						<div className="item-star">
							{this.makeInput("number", "score")}
						</div> stars :
					</div>
					<div className="comment-subject">
						{this.makeInput("text", "header")}
					</div>
					<div className="item-body">
						{this.makeInput("textarea", "body")}
					</div>
					{
						(writer.username == this.props.auth.username || this.props.auth.username == "admin") &&
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