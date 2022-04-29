import React from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
	return (
		<div className='authorization'>
			<form>
				<input
					placeholder="name"
					type='text'
				/>
				<input
					placeholder="email"
					type='email'
				/>
				<input
					type='password'
					placeholder="password"
				/>
				<input
					type='password'
					placeholder="Confirm Password"
				/>
				<button>
					<Link to="/game">Войти</Link>
				</button>
			</form>
		</div>
	)
}

export { Register }
