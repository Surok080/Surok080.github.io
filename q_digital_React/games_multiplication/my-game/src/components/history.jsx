import React from 'react';
import { Component } from "react";


export class History extends Component {
	constructor(props) {
		super(props);
		this.Logout = this.Logout.bind(this);
		this.goToList = this.goToList.bind(this);
	}

	render() {
		const items = localStorage.getItem('items');
		const itemsJson = JSON.parse(items);
		const arrayHistory = itemsJson.data.questions.map((his, key) =>
			<tr key={key}>
				<th scope="row">{key}</th>
				<td>{his.question}</td>
				<td>{his.answer}</td>
				<td>{his.current_answer}</td>
			</tr>
		)

		return (
			<>
				<div className="container w-50 mx-auto border p-3 text-center">
					<h3>ИСТОРИЯ</h3>
					<hr />
					<h3>Очков набрано: {itemsJson.data.points}</h3>
					<hr />
					<table className="table table-striped mt-5">
						<thead>
							<tr>
								<th scope="col">#</th>
								<th scope="col">Question</th>
								<th scope="col">Answer</th>
								<th scope="col">Current answer</th>
							</tr>
						</thead>
						<tbody>
							{arrayHistory}
						</tbody>
					</table>
					<div 
					className="row w-25 m-auto"
					>
						<button
						className="btn btn-primary btn-lg mt-3 "
						onClick={this.goToList}
					>
						Попробовать еще раз
					</button>
					<button
						className="btn btn-danger mt-3"
						onClick={this.Logout}
					>
						Выйти из профиля
					</button>
					</div>
					
				</div>
			</>
		);
	}
	Logout() {
		localStorage.clear();
		window.location = '/login';
	}
	goToList() {
		window.location = '/list';
	}
}
