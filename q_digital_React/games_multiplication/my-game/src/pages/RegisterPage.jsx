import { Register } from "components/Register"
import { Link } from "react-router-dom"

const RegisterPage = () => {
	return (
		<div>
			<h1>Register</h1>
			<Register/>
			<p>
				Already have an account? <Link to="/login">Sign in</Link>
			</p>
		</div>
	)
}

export { RegisterPage }
