
import { Component } from "react";
import { Navigate } from "react-router-dom";

export class ProtectedHistory extends Component {

	render() {
		const Component = this.props.component;
		const localItems = JSON.parse(localStorage.getItem('items'));
		const isAuth = Boolean(localItems.data.questions);
		return (
			<div>
				{isAuth ? <Component /> : <Navigate to='/list' replace />}
			</div>
		)
	}
}
