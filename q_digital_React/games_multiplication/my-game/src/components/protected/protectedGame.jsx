
import { Component } from "react";
import { Navigate } from "react-router-dom";

export class ProtectedGame extends Component {

	render() {
		const Component = this.props.component;
		const isAuth = Boolean(localStorage.getItem('items'))

		return (
			<div>
				{isAuth ? <Component /> : <Navigate to='/list' replace />}
			</div>
		)
	}
}
