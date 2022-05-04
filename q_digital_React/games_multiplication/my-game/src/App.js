import { Main } from './components/main';
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Login } from './components/login';
import { Auth } from './components/auth/auth';
import { List } from './components/list';
import { Games } from './components/game/games';
import { History } from './components/history';
import { Protected } from './components/protected/protected';





function App(props) {
	const navigate = useNavigate();

	return (
		<Routes >
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login navigate={navigate} />} />
			<Route path='/auth' element={<Auth navigate={navigate} /> } />
			<Route path='/list' element={<Protected component={List} address='/login' localItem='token' />} />
			<Route path='/games' element={<Protected component={Games} address='/list' localItem='type' />} />
			<Route path='/history' element={<Protected component={History} address='/list' localItem='type' historyToken = {true} />} />
			<Route path='/*' element={<Main />} />
		</Routes>
	);

}
export default App;
// class App extends Component {
// 	render() {
// 		return (
// 			<Routes >
// 				<Route path='/' element={<Main />} />
// 				<Route path='/login' element={<Login />} />
// 				<Route path='/auth' element={<Auth />} />
// 				<Route path='/list' element={<Protected component={List} />} />
// 				<Route path='/games' element={<ProtectedGame component={Games} />} />
// 				<Route path='/history' element={<ProtectedHistory component={History} />} />
// 			</Routes>
// 		);
// 	}
// }
