import {GamePage} from 'pages/GamePage';
import { Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';



function App() {
	return (
		<Routes>
			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/game' element={<GamePage />} />
		</Routes>
	);
}

export default App;
