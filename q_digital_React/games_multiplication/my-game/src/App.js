import { Main } from './components/main';
import { Routes, Route } from 'react-router-dom'
import { Login } from 'components/login';
import { Auth } from 'components/auth';
import { List } from 'components/list';
import { Games } from 'components/games';
import { History } from 'components/history';
import { Component } from "react";
import { Protected } from 'components/protected/protected';
import { ProtectedGame } from 'components/protected/protectedGame';





export class App extends Component {
	render() {
		return (
			<Routes >
				<Route path='/' element={<Main />} />
				<Route path='/login' element={<Login />} />
				<Route path='/auth' element={<Auth />} />
				<Route path='/list' element={<Protected component={List} />} />
				<Route path='/games' element={<ProtectedGame component={Games} />} />
				<Route path='/history' element={<ProtectedGame component={History} />} />



			</Routes>
		);
	}
}
