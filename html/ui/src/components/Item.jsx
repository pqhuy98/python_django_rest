import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from "moment"
import { SlideUp } from './Animation';
import { TransitionGroup } from 'react-transition-group'

import * as a from '../actions/data';
import InputData from './InputData';
import Comment from './Comment';
import CommentForm from './CommentForm';

class Item extends Component {
	constructor(props, context) {
		super(props, context);
		var cmts = this.findComments(this.props.item.url, this.props.comments);
		this.state = {
			edit: false,
			name: this.props.item.name,
			price: this.props.item.price,
			amount: this.props.item.amount,
			owner: this.getUser(this.props.item.owner, this.props.users),
			comments: cmts,
			score: this.calculateScore(cmts),
		};
	}

	componentWillReceiveProps(nextProps) {
		var cmts = this.findComments(nextProps.item.url, nextProps.comments);
		this.setState({
			owner: this.getUser(nextProps.item.owner, nextProps.users),
			comments: cmts,
			score: this.calculateScore(cmts),
		});
	}

	findComments(url, comments) {
		var res = [];
		comments.map((c) => {
			if (c.to == url) {
				res.push(c);
			}
		});
		return res;
	}

	calculateScore(comments) {
		var scoreMap = {};
		var totalScore = 0;
		var amount = 0;
		comments.map((x) => {
			if (typeof scoreMap[x.owner] == "undefined") {
				scoreMap[x.owner] = x.score
			} else {
				totalScore-= scoreMap[x.owner];
				amount-=1;
				scoreMap[x.owner] = Math.max(scoreMap[x.owner], x.score);
			}
			amount+=1;
			totalScore+= scoreMap[x.owner];
		});
		return amount > 0 ? totalScore/amount : 0;
	}

	getUser(url, users) {
		var res = {};
		users.map((u) => {
			if (u.url == url) {
				res = u;
			}
		});
		return res;
	}

	onSave(key, value) {
		var newItem = Object.assign({}, this.props.item);
		newItem[key] = value;
		this.props.dispatch(a.putData("items", newItem));
	}

	onDelete() {
		this.props.dispatch(a.deleteData("items", this.props.item.url));
	}

	makeInput(type, key) {
		return <InputData
			type={type}
			value={this.props.item[key]}
			idkey={key}
			onSave={(idkey, value) => this.onSave(idkey, value)}
			editable={this.state.owner.username == this.props.auth.username}
		/>
	}

	render() {
		var owner = this.state.owner;
		var cmts = this.state.comments;
		var date = new Date(this.props.item.created_at);
		return (
			<div className="item-container">
				<div className="date">
					{moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a")}
				</div>
				<div className="post-by">
					<span className={"comment-writer-username "+(this.props.auth.username == owner.username && "me")}>
						{owner.username}
					</span> posted an item :
				</div>
				<table><tbody>
					<tr>
						<td className="item-name">
							{this.makeInput("text", "name")}
						</td>
						<td className="item-price">
							{this.makeInput("number", "price")}
							<span>$</span>
						</td>
						<td className="item-amount">
							{this.makeInput("number", "amount")}
							<span>×</span>
						</td>
					</tr>
				</tbody></table>
				<div className="comment-group">
					<div>
						<b>Comments (<span className="star">{this.state.score}</span> stars average) :</b>
					</div>
					<TransitionGroup>
						{
							cmts.map((x) => {
								return <SlideUp key={x.url}>
									<Comment comment={x} />
								</SlideUp>
							})
						}
						<div>{(cmts.length > 0) ? "" : "No comment yet."}</div>
					</TransitionGroup>
				</div>
				<CommentForm item={this.props.item}/>
				{
					(owner.username == this.props.auth.username || this.props.auth.username == "admin") &&
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