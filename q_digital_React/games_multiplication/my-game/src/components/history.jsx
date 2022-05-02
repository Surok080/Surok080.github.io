import React from 'react';
import { Component } from "react";


export class History extends Component {
	constructor(props) {
		super(props);
		this.state = { type: '1' };
		this.handleChangeSelect = this.handleChangeSelect.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.getList = this.getList.bind(this);
	}

	render() {
		return (
			<>
				<div className="container w-25 mx-auto border p-5 ">
					ИСТОРИЯ
				</div>
			</>
		);
	}



	getList() {
		console.log('tyes');
	}


	handleChangeSelect(e) {
		this.setState({ type: e.target.value });
	}
	// SendTask(){
	//     console.log(this.state.value);
	// }

	handleSubmit(e) {
		e.preventDefault();

		const newPost = {
			type_hard: +this.state.type,
			type: 1,

		}
		// console.log(JSON.parse(localStorage.getItem('token')));
		fetch("https://internsapi.public.osora.ru/api/game/play", {
			method: "POST",
			body: JSON.stringify(newPost),
			headers: {
				"Authorization": `Bearer ${JSON.parse(localStorage.getItem('token'))}`,
				"Content-type": "application/json; charset=UTF-8",
			},
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				localStorage.setItem('items', JSON.stringify(data));
				localStorage.setItem('type_hard', JSON.stringify(+this.state.type));
				localStorage.setItem('type', 1);
				window.location = '/games'
			})
	}
}
