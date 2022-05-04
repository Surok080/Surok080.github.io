import React from 'react';
import { Component } from "react";
import { Link } from "react-router-dom";
import { Input } from './authInputs/input';



export class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = { login: "", user: "", password: '', password_confirmation: '' };

		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		console.log(this.state.user);
		return (
			<div
				className='container w-25 mt-2'
			>
				<form onSubmit={this.handleSubmit}>
					<label
						className="mb-4 p-1 w-25"
					>
						Регистрация
					</label>
					<br />
					<Input type='text' placeholder="username" name='user' dataState={this.state.user} input={this.handleChange} />
					<br />
					<Input type='email' placeholder="email" name='login' dataState={this.state.login} input={this.handleChange} />
					<br />
					<Input type='password' placeholder="пароль" name='password' dataState={this.state.password} input={this.handleChange} />
					<br />
					<Input type='password' placeholder="пароль еще раз" name='password_confirmation' dataState={this.state.password_confirmation} input={this.handleChange} />

					<br />
					<button
						className="btn btn-success mt-3"
					>
						Регистрация
					</button>
				</form>
				<Link to="/login" className="btn btn-primary mt-3 center-block mh-100" >Есть аккаунт</Link>
			</div>
		);
	}


	handleChange(e, nameState) {
		this.setState({ [nameState]: e.target.value });
	}

	handleSubmit(e) {
		e.preventDefault();

		const data = {
			name: this.state.user,
			email: this.state.login, // also email.login
			password: this.state.password,
			password_confirmation: this.state.password_confirmation,
		}

		fetch("https://internsapi.public.osora.ru/api/auth/signup", {
			method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.status) {
					alert('Регистрация прошла успешно')
					window.location = '/login';
				} else {
					let error = data.errors[Object.keys(data.errors)[0]];
					alert(error[Object.keys(error)[0]])

				}

			})
	}
}

