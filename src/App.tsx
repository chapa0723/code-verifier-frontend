import React from 'react';
import './App.css';

// React router dom import
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { KatasPage } from './pages/KatasPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { KatasDetailPage } from './pages/KatasDetailPage';

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
        {/* TODO: Export to routes folder */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/katas' element={<KatasPage />} />
          <Route path='/katas/:id' element={<KatasDetailPage />} />
          {/* Redirect when Page not found */}
          <Route 
          path='/*' 
          element={<Navigate to= '/' replace />} >
          </Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
