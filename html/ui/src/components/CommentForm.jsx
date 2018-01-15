import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as a from '../actions/data';
import Comment from './Comment';

class CommentForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			header: "",
			body: "",
			score: 3,
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
			writer: me.url,
			to: this.props.item.url,
			header: this.state.header,
			body: this.state.body,
			score: this.state.score
		}
		this.props.dispatch(a.postData("comments", cmt));
	}

	render() {
		return (
			<div className="comment-form">
				<div>
				Write a comment for <b>{this.props.item.name}</b>:
				</div>
				<div className="comment-form-title">
					<span className="label">Title : </span>
					<input type="text" placeholder="Just a short summary"
						value={this.state.header}
						onChange={(e) => this.handleChange("header", e)}
					/>
				</div>
				<div className="comment-form-score">
					<span className="score-label">Score : (?? / 5.0) </span>
					<input type="number" min="0" max="5" placeholder="Score"
						value={this.state.score}
						onChange={(e) => this.handleChange("score", e)}
					/>
				</div>
				<div className="comment-form-body">
					<span className="label">Comment : </span>
					<textarea placeholder="Have a lot to say ? Put it here !"
						value={this.state.body}
						onChange={(e) => this.handleChange("body", e)}
					/>
				</div>
				<button onClick={() => this.onSubmit()} className="comment-form-submit">
					Submit
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

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);