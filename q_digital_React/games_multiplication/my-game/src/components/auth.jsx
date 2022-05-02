import { Component } from "react";
import { Link } from "react-router-dom";



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
					<input
						className='form-control w-50 text-center m-auto'
						onChange={this.handleChangeUsername}
						value={this.state.user}
						placeholder="username"
					/>
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
					<input
						type='password'
						className='form-control w-50 text-center m-auto'
						onChange={this.handleChangepassword_confirmation}
						value={this.state.password_confirmation}
						placeholder="пароль повторить"
					/>
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

