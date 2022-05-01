import React from 'react';
import { Component } from "react";


export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = { login: "", password: '' };
		this.handleChangeLogin = this.handleChangeLogin.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.Logout = this.Logout.bind(this);
	}

	render() {
		return (
			<div>

				<form onSubmit={this.handleSubmit}>
					<label className="border">
						вход
					</label>
					<br />
					<input
						onChange={this.handleChangeLogin}
						value={this.state.login}
						placeholder="email"
					/>
					<br />
					<input
						onChange={this.handleChangePassword}
						value={this.state.password}
						placeholder="пароль"
					/>
					<br />

					<button>
						войти
					</button>
				</form>
				<button onClick={this.Logout}>Logout</button>
				{/* <button onClick={() => { this.props.updateData(!this.props.ticet) }}>Запустить бумеранг</button> */}
			</div>
		);
	}

	handleChangeLogin(e) {
		this.setState({ login: e.target.value });
	}
	handleChangePassword(e) {
		this.setState({ password: e.target.value });
	}
	Logout() {
		// console.log(this.props.ticet)
		localStorage.clear();
		window.location = '/';

	}
	handleSubmit(e) {
		e.preventDefault();
		localStorage.clear();
		console.log('yes', this.state.login, this.state.password);


		const newPost = {
			email: this.state.login, // also email.login
			password: this.state.password,

		}

		fetch("https://internsapi.public.osora.ru/api/auth/login", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(this.props.ticet);
				localStorage.setItem('token', JSON.stringify(data.data.access_token))
				window.location = '/list'
			})

	}
}
