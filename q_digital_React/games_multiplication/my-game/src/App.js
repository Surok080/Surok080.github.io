import { Main } from './components/main';
import { Routes, Route } from 'react-router-dom'
import { Login } from 'components/login';
import { Auth } from 'components/auth';
import { List } from 'components/list';
import { Games } from 'components/games';






function App() {

	return (
		<Routes >
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='/auth' element={<Auth />} />
			<Route path='/list' element={<List />} />
			<Route path='/games' element={<Games />} />
		</Routes>
	);
}

export default App;
