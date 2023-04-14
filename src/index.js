import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import IngredientContextProvider from './contexts/ingredientContext';
import AuthContextProvider from './contexts/authContext';
import RecipeContextProvider from './contexts/recipeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <IngredientContextProvider>
        <RecipeContextProvider>
          <App />
        </RecipeContextProvider>
      </IngredientContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
