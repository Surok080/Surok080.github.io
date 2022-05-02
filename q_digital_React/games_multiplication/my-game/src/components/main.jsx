import { Component } from "react";
import { Link } from "react-router-dom";



export class Main extends Component {

	// state = {
	// 	name: 'Alex',
	// 	age: 1,
	// 	ticet: false,
	// }
	// updateData = (value) => {
	// 	this.setState({ ticet: value })
	// }


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
