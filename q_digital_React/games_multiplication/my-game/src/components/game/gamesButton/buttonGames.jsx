import React from 'react';
import { Component } from "react";


export class Button extends Component {
	constructor(props) {
		super(props);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (

			<button disabled={this.props.status ? 'disabled' : ''} className='p-2 m-3 btn-outline-warning text-dark btn-lg w-25' value={this.props.option[this.props.index]} onClick={this.props.handleSubmit}>
				{this.props.option[this.props.index]}
			</button>

		)
	}

	handleSubmit(e) {
		this.props.handleSubmit(e)
	}

}
