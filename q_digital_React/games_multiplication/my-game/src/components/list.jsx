// import { Logout } from "@mui/icons-material";
import { Component } from "react";
import { Link } from "react-router-dom";

export class List extends Component {
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
				<div className="container mx-auto border p-5 ">
					<form onSubmit={this.handleSubmit}>
						<label>
							Pick your favorite flavor:
							<select className="form-select w-50" value={this.state.type} onChange={this.handleChangeSelect}>
								<option disabled="disabled">Выбери сложность</option>
								<option value="1">легко </option>
								<option value="2">тяжело</option>
							</select>
						</label>
						<input className="btn btn-danger mt-3" type="submit" value="Submit" />
					</form>
				</div>
			</>
		);
	}



getList(){
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
			})
	}
}

