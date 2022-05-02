import { Component } from "react";
import { Link } from "react-router-dom";

export class Main extends Component {

	render() {

		return (
			<div
				className='container w-100 h-100 p-5 m-auto'
			>
				<hr />
				<Link to="/login" className="btn btn-primary mt-3 center-block mh-100"> Авторизация</Link>
				<hr />
			</div>
		)
	}
}
