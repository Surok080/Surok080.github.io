import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {




	return (
		<div className='authorization'>
			<form>
				<input
					placeholder="email"
					type='email'
				/>
				<input
					type='password'
					placeholder="password"
				/>
				<button>
					<Link to="/game">Войти</Link>
				</button>
			</form>
		</div>
	)
}

export { Login }
