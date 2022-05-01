import { Component } from "react";
import { Auth } from './auth';
import { Login } from './login';
// import { List } from './list';

export class Main extends Component {

	state = {
		name: 'Alex',
		age: 1,
		say: function () {
			// this.setState({ age: 2});
			console.log('say hay')
		},
	}


	render() {

		return (
			<>
				<Auth />
				<hr />
				<Login />
				<hr />
				{/* <List /> */}
			</>
		)
	}

}
