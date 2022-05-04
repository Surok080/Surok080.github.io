import React from 'react';
import { Component } from "react";


export class InputGames extends Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}


	render() {
		return (
			<div>
			
				<form onSubmit={this.props.handleSubmit}  >
					<label className="mb-4 p-1 w-25">
						Ваш ответ
					</label>
					<br />
					<input
						autoFocus={true}
						required="required"
						type='text'
						onChange={this.props.handleChange}
						value={this.props.options}
						className='form-control w-50 text-center m-auto'
					/>
					<input className="btn btn-primary mt-3" type="submit" value="Отправить" />
				</form>

			</div>
		)
	}

	handleSubmit(e) {
		this.props.handleSubmit(e)
	}

	handleChange(e) {
		this.props.handleChange(e)
	}

}
