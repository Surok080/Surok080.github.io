import React from 'react';
import { Component } from "react";


export class Input extends Component {
	constructor(props) {
		super(props);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
	}


	render() {
		return (
			<div>
				<input
					className='form-control w-50 text-center m-auto'
					onChange={(e) => this.handleChangeUsername(e, this.props.name)}
					value={this.props.dataState}
					placeholder={this.props.placeholder}
				/>
			</div>
		)
	}

	handleChangeUsername(e, b) {
		this.props.input(e,b)
	}

}
