import React from 'react';
import { Component } from "react";


export class List extends Component {
	constructor(props) {
		super(props);
		this.state = { type: '1' };
		this.handleChangeSelect = this.handleChangeSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.logOut = this.logOut.bind(this);
		this.history = this.history.bind(this);
	}

	render() {
		return (
			<>
				<div className="container w-25 mx-auto border p-5 ">
					<form
						onSubmit={this.handleSubmit}
						className="row"
					>
						<label
							className="mb-3"
						>
							Выберите сложность:
							<select className="form-select w-50 m-auto mt-3" value={this.state.type} onChange={this.handleChangeSelect}>
								<option disabled="disabled">Выбери сложность</option>
								<option value="1">легко </option>
								<option value="2">тяжело</option>
							</select>
						</label>
						<input className="btn btn-primary m-auto mt-3 w-50" type="submit" value="Проверить знания" />
					</form>
					<button
						className="btn btn-warning m-3"
						onClick={this.history}
					>
						Посмотреть историю
					</button>
					<button
						className="btn btn-danger m-3"
						onClick={this.logOut}
					>
						Выйти из профиля
					</button>
				</div>
			</>
		);
	}



	history() {
		window.location = '/history'
	}

	logOut() {
		localStorage.clear();
		window.location = '/login'
	}

	handleChangeSelect(e) {
		this.setState({ type: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const data = {
			type_hard: +this.state.type,
			type: 1,

		}
		fetch("https://internsapi.public.osora.ru/api/game/play", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem('items', JSON.stringify(data));
				localStorage.setItem('type_hard', JSON.stringify(+this.state.type));
				localStorage.setItem('type', 1);
				// if (+this.state.type === 1) {
					window.location = '/games'
				// } else if (+this.state.type === 2) {
				// 	window.location = '/gamesHard'
				// }

			})
	}
}

