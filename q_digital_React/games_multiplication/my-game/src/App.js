import { Main } from './components/main';
import { Routes, Route } from 'react-router-dom'
import { Login } from 'components/login';
import { Auth } from 'components/auth';
import { List } from 'components/list';
import { createBrowserHistory } from 'history'





function App() {
	const history = createBrowserHistory()
	return (
		<Routes history={history}>
			<Route path='/' element={<Main />} />
			<Route path='/login' element={<Login />} />
			<Route path='/auth' element={<Auth />} />
			<Route path='/list' element={<List />} />
		</Routes>
	);
}

export default App;
