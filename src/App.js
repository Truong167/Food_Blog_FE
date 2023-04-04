import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import  Auth  from './pages/Auth'
import AuthContextProvider from './contexts/authContext';
import HomePage from './pages/HomePage';
import PrivateRoutes from './components/RequiredAuth/PrivateRoutes';
import React from 'react';
import RecipeDetailPage from './pages/RecipeDetailPage';
import DetailUserPage from './pages/DetailUserPage';
import SearchResultPage from './pages/SearchResultPage';

function App() {
  return (
    <AuthContextProvider>
		<Router>
			<Routes>
				<Route path="/login" element={<Auth authRoute='login' />} />
				<Route path="/register" element={<Auth authRoute='register' />} />

				<Route element={<PrivateRoutes />}>
					<Route path="/" element={<HomePage />} />
				</Route>

				<Route element={<PrivateRoutes/>}>
					<Route path="/detail/:id" element={<RecipeDetailPage />} />
				</Route>


				<Route element={<PrivateRoutes/>}>
					<Route path="/user/:id" element={<DetailUserPage />} />
				</Route>

				<Route element={<PrivateRoutes />}>
					<Route path="/search/:recipeName" element={<SearchResultPage />} />
				</Route>
			</Routes>
		</Router>
    </AuthContextProvider>
  );
}

export default App;
