import { Component } from "react";
import { Auth } from './auth';
// import { Login } from './login';
// import { List } from './list';


export class Main extends Component {

	state = {
		name: 'Alex',
		age: 1,
		ticet: false,
	}
	updateData = (value) => {
		this.setState({ ticet: value })
	}


	render() {

		return (
			<>
				<Auth />
				<hr />
				{/* <Login updateData={this.updateData} ticet={this.state.ticet} /> */}
				<hr />
			


			</>
		)
	}

}
