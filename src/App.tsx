import React from 'react';
import './App.css';

// React router dom import
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { KatasPage } from './pages/KatasPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasDetailPage } from './pages/KatasDetailPage';
import { AppRoutes } from './routes/Routes';

// import LoginForm from './components/Forms/LoginForm';
// import RegisterForm from './components/Forms/RegisterForm';

function App() {
  return (
    <div className="App">
      {/* Render Login Form */}
      {/* <LoginForm /> */}
      {/* Render Register Form */}
      {/* <RegisterForm /> */}
      <Router>
        <nav>
          <ul>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
            <li>
              <Link to='/register'>Register</Link>
            </li>
            <li>
              <Link to='/katas'>Katas</Link>
            </li>
          </ul>
        </nav>
        <AppRoutes />
      </Router>

    </div>
  );
}

export default App;
