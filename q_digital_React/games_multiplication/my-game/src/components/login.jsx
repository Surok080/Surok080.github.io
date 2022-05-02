import React from 'react';
import { Component } from "react";


export class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
			login: "",
			password: '',
			statusLogin: 'disabled',
		};
		this.handleChangeLogin = this.handleChangeLogin.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.regOut = this.regOut.bind(this);
		this.goToList = this.goToList.bind(this);
	}

	render() {
		return (
			<div>
				<div className='container w-25 mt-2'>
					<form onSubmit={this.handleSubmit}  >
						<label className="mb-4 p-1 w-25">
							Вход
						</label>
						<br />
						<input
							className='form-control w-50 text-center m-auto'
							onChange={this.handleChangeLogin}
							value={this.state.login}
							placeholder="email"
						/>
						<br />
						<input
							type='password'
							className='form-control w-50 text-center m-auto'
							onChange={this.handleChangePassword}
							value={this.state.password}
							placeholder="пароль"
						/>
						<br />

						<button
							className="btn btn-primary mt-3"
						>
							Войти
						</button>
					</form>
					<button
						className="btn btn-danger mt-3"
						onClick={this.regOut}
					>
						Регистрация
					</button>
					<br></br>
					<button
						className={"btn btn-primary btn-lg mt-3 " + this.state.statusLogin}
						onClick={this.goToList}
					>
						В личный кабинет
					</button>
				</div>
			</div>
		);
	}

	componentDidMount() {
		if (localStorage.getItem('token')) {
			this.setState({
				statusLogin: '',
			});
		} else {
			this.setState({
				statusLogin: 'disabled',
			});
		}
	}

	handleChangeLogin(e) {
		this.setState({ login: e.target.value });
	}

	handleChangePassword(e) {
		this.setState({ password: e.target.value });
	}

	regOut() {
		localStorage.clear();
		window.location = '/auth';
	}

	goToList() {
		window.location = '/list';
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
				if (data.status) {
					localStorage.setItem('token', JSON.stringify(data.data.access_token))
					window.location = '/list'
				} else if (Object.keys(data.errors).length < 3) {
					let error = data.errors[Object.keys(data.errors)[0]];
					alert(error[Object.keys(error)[0]])
				} else {
					alert(data.errors)
				}
			})

	}
}
