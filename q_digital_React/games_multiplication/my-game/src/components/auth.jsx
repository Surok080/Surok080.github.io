import { Component } from "react";
import {history} from '../App';

export class Auth extends Component {
	constructor(props) {
		super(props);
		this.state = { login: "", user: "", password: '', password_confirmation: '' };
		this.handleChangeLogin = this.handleChangeLogin.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);
		this.handleChangepassword_confirmation = this.handleChangepassword_confirmation.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div>

				<form onSubmit={this.handleSubmit}>
					<label>
						Регистрация
					</label>
					<br />
					<input
						onChange={this.handleChangeUsername}
						value={this.state.user}
						placeholder="username"
					/>
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
					<input
						onChange={this.handleChangepassword_confirmation}
						value={this.state.password_confirmation}
						placeholder="пароль повторить"
					/>
					<button>
						Регистрация
					</button>
				</form>

			</div>
		);
	}

	handleChangeLogin(e) {
		this.setState({ login: e.target.value });
	}
	handleChangeUsername(e) {
		this.setState({ user: e.target.value });
	}
	handleChangepassword_confirmation(e) {
		this.setState({ password_confirmation: e.target.value });
	}
	handleChangePassword(e) {
		this.setState({ password: e.target.value });
	} // yes

	handleSubmit(e) {
		e.preventDefault();
		console.log('yes', this.state.login, this.state.user, this.state.password, this.state.password_confirmation);


		const newPost = {
			name: this.state.user,
			email: this.state.login, // also email.login
			password: this.state.password,
			password_confirmation: this.state.password_confirmation,
		}

		fetch("https://internsapi.public.osora.ru/api/auth/signup", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data)
				history.push('/list');

			})
	}
}

