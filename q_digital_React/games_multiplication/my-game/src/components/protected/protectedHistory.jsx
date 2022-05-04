
import { Component } from "react";
import { Navigate } from "react-router-dom";

export class ProtectedHistory extends Component {

	render() {
		const Component = this.props.component;
		const localItems = JSON.parse(localStorage.getItem('items'));
		let isAuth;
		if (localItems) {
			isAuth = Boolean(localItems.data.questions);
		}

		return (
			<div>
				{isAuth ? <Component /> : <Navigate to='/list' replace />}
			</div>
		)
	}
}
