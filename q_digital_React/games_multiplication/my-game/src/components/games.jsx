import React from 'react';
import { Component } from "react";


export class Games extends Component {

	constructor(props) {
		// let item = JSON.parse(localStorage.getItem('items'));
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
		const optionArray = this.state.status;
		let testP = this.state.options;
		let arrayButton;

		if (optionArray.length > 0) {
			arrayButton = optionArray.map((his, key) =>
				<button key={key} className='p-2 m-3 btn-outline-warning text-dark btn-lg w-25' value={optionArray[key]} onClick={this.handleSubmit}>{optionArray[key]}</button>
			)
		} else if (optionArray.length <= 0) {
			arrayButton = <form onSubmit={this.Logout}  >
				<label className="mb-4 p-1 w-25">
					Ваш ответ
				</label>
				<br />
				<input
					type='text'
					onChange={this.handleChangeAnswer}
					value= {testP}
					className='form-control w-50 text-center m-auto'
					placeholder="ответ"
				/>
				<button className="btn btn-primary mt-3" type="submit" value="Отправить">
					Отправить
				</button>
			</form>

		}

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
					{arrayButton}
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
		console.log(e);
		this.setState({ options: e.target.value });
		console.log(this.state.options);
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

	Logout(e) {
		console.log(this.state.options);
		console.log(e.target.value);
		// window.location = '/list'
	}

	handleSubmit(e) {
		console.log(e.target.value);
		e.preventDefault();

		this.setState({ count: 2 });
		const newPost = {
			answer: e.target.value,
			type_hard: localStorage.getItem('type_hard'),
			type: this.state.count,

		}

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
				// localStorage.setItem('token', JSON.stringify(data.data.access_token))
				window.location = '/games'
			})

	}
}
