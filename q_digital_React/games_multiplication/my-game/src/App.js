
import LoginPage from 'pages/LoginPage';
import { Routes, Route } from 'react-router-dom'




function App() {
	return (
		<Routes>
			<Route path='/' element={<LoginPage />} />
			{/* <Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/loginOne' element={<LoginPageOne />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/game' element={<GamePage />} /> */}
		</Routes>
	);
}

export default App;
