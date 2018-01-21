import React, { Component } from 'react';
import { connect } from 'react-redux';
import enhanceWithClickOutside from "react-click-outside";
import moment from "moment"
import TextareaAutosize from 'react-autosize-textarea';

import * as a from '../actions/data';

class InputData extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: false,
			value: this.props.value,
		};
	}

	componentWillReceiveProps(nextProps) {
		if (!this.state.open) {
			this.setState({value: nextProps.value})
		}
	}

	onChange(e) {
		this.setState({
			value: e.target.value,
		});
	}

	onClick(e) {
		if (this.props.editable) {
			this.setState({
				open: true,
			});
		}
	}

	handleClickOutside() {
		if (this.state.open) { // will close
			this.setState({
				open: false,
			});
			if (typeof this.props.onSave == "function" && this.props.value != this.state.value) {
				this.props.onSave(this.props.idkey, this.state.value);
			}
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (!prevState.open && this.state.open) {
			this.input.focus();
		}	
	}

	render() {
		return (
			<span onClick={(e) => this.onClick(e)}>
			{
				this.props.type=="textarea" ?
					<TextareaAutosize
						innerRef={me => {this.input = me}} 
						value={this.state.value}
						className={this.props.className + " " + (this.props.editable ? "editable" : "uneditable")}
						disabled={!this.state.open}
						onChange={(e) => this.onChange(e)}
					/>
				: <input
					ref={(me) => { this.input = me; }}
					type={this.props.type}
					value={this.state.value}
					className={this.props.className + " " + (this.props.editable ? "editable" : "uneditable")}
					disabled={!this.state.open}
					onChange={(e) => this.onChange(e)}
				/>
			}
			</span>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

function mapDispatchToProps(dispatch) {
	return {
		dispatch
	};
}

InputData = enhanceWithClickOutside(InputData);
export default connect(mapStateToProps, mapDispatchToProps)(InputData);