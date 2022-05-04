import React from 'react';
import { Component } from "react";


export class Input extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}


	render() {
		return (
			<div>
				<input
					type={this.props.type}
					className='form-control w-50 text-center m-auto'
					onChange={(e) => this.handleChange(e, this.props.name)}
					value={this.props.dataState}
					placeholder={this.props.placeholder}
				/>
			</div>
		)
	}

	handleChange(e, b) {
		this.props.input(e, b)
	}

}
