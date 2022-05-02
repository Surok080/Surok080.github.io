import React from 'react';
import { Component } from "react";


export class GamesHard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: '',
			question: '',
			count: '',
			seconds: 8,
			status: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
		this.Logout = this.Logout.bind(this);
	}

	render() {
		return (
			<div className='container w-25'>
				<div
					className='h4'
				>
					Секунды: {this.state.seconds} {this.g}
				</div>
				<br></br>
				<h2>Score </h2>
				<div
					className='h3 m-4'
				>{this.state.question + ' = ...'}</div>
				<div
					className='col w-75 m-auto '
				>
					<form onSubmit={this.handleSubmit}  >
						<label className="mb-4 p-1 w-25">
							Ваш ответ
						</label>
						<br />
						<input
							autoFocus={true}
							required="required"
							type='text'
							onChange={this.handleChangeAnswer}
							value={this.state.options}
							className='form-control w-50 text-center m-auto'
						/>

						<input className="btn btn-primary mt-3" type="submit" value="Отправить" />

					</form>
				</div>

				<br></br>
				<button className='p-2 m-3 btn-outline-danger btn-lg w-25' onClick={this.Logout}>Stop Game</button>

				<br></br>
			</div>
		);
	}

	tick() {
		this.setState(state => ({
			seconds: state.seconds - 1
		}));
	}

	handleChangeAnswer(e) {
		if (typeof (+e.target.value) == "number" && !isNaN(+e.target.value)) {
			this.setState({ options: e.target.value });
		}
	}

	componentDidMount() {
		const user = localStorage.getItem('items');
		const count = localStorage.getItem('type');
		let arrayItem = JSON.parse(user);
		if (arrayItem.data.question) {
			this.interval = setInterval(() => this.tick(), 1000);
			this.setState({
				options: arrayItem.data.options,
				status: arrayItem.data.options,
				question: arrayItem.data.question,
				count: count,
				seconds: arrayItem.data.time,
			});
			console.log(arrayItem);
		} else {
			window.location = '/history'
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	Logout() {
		window.location = '/list'
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log(this.state.options);

		this.setState({ count: 2 });
		const newPost = {
			answer: this.state.options,
			type_hard: localStorage.getItem('type_hard'),
			type: this.state.count,

		}
		console.log(newPost);
		fetch("https://internsapi.public.osora.ru/api/game/play", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem('items', JSON.stringify(data));
				localStorage.setItem('type', this.state.count);
				window.location = '/gamesHard'
			})

	}
}
