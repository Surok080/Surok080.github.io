import React from 'react';
import { Component } from "react";
import { Button } from './gamesButton/buttonGames';
import { InputGames } from './gamesButton/inputGames';


export class Games extends Component {

	constructor(props) {
		super(props);
		this.state = {
			options: '',
			question: '',
			count: '',
			seconds: 8,
			statusButton: false,
			type_hard: '',
		};
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChangeAnswer = this.handleChangeAnswer.bind(this);
		this.backToList = this.backToList.bind(this);
	}

	render() {
		const hardGame = localStorage.getItem('type_hard');
		const optionArray = this.state.options;
		const isAuth = Boolean(this.state.statusButton)
		let element;
		//Проверить еще сложность от сложности рендерить ипут или кнопки
		if (this.state.options && +hardGame === 1) {
			element = this.state.options.map((item, index) => {
				return <Button key={index} index={index} status={isAuth} option={optionArray} handleSubmit={this.handleSubmit} />
			});
		} else if (this.state.options && +hardGame === 2) {
			element = <InputGames handleSubmit={this.handleSubmit} handleChange={this.handleChangeAnswer} options={this.state.options} />
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
					{element}
				</div>
				<br></br>
				<button className='p-2 m-3 btn-outline-danger btn-lg w-25' onClick={this.backToList}>Stop Game</button>

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
		this.setState({ options: e.target.value });
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
		} else {
			window.location = '/history'
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	backToList() {
		window.location = '/list'
	}

	handleSubmit(e) {
		e.preventDefault();

		let data;
		if (+localStorage.getItem('type_hard') === 1) {
			this.setState({
				count: 2,
				statusButton: true,
			});
			data = {
				answer: e.target.value,
				type_hard: localStorage.getItem('type_hard'),
				type: this.state.count,
			}
		} else if (+localStorage.getItem('type_hard') === 2) {
			this.setState({ count: 2 });
			data = {
				answer: this.state.options,
				type_hard: localStorage.getItem('type_hard'),
				type: this.state.count,
			}
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
				localStorage.setItem('type', this.state.count);
				// localStorage.setItem('token', JSON.stringify(data.data.access_token))
				window.location = '/games'
			})

	}
}
