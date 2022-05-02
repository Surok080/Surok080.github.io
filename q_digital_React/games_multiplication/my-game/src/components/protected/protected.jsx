
import { Component } from "react";
import { Navigate } from "react-router-dom";

export class Protected extends Component {

	render() {
		const Component = this.props.component;
		const isAuth = Boolean(localStorage.getItem('token'))

		return (
			<div>
				{isAuth ? <Component /> : <Navigate to='/login' replace />}
			</div>
		)
	}
}
