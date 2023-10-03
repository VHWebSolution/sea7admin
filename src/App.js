import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import Sidebar from './Components/Sidebar';
import AdicionarProduto from './Pages/AdicionarProduto';
import GerenciarProdutos from './Pages/GerenciarProdutos';
import AlterarProduto from './Pages/AlterarProduto';

const App = () => {
  const initialToken = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [navVisible, setNavVisible] = useState(false);
  const [token, setToken] = useState(initialToken || ''); // Initialize token with initialToken

  useEffect(() => {
    const shouldRememberLogin = localStorage.getItem('rememberLogin') === 'true';
    if (shouldRememberLogin) {
      setIsAuthenticated(true);
    }
  }, []);

  const toggleNavbar = () => {
    setNavVisible((prevNavVisible) => !prevNavVisible);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken('');
  };

  const setAuthToken = (authToken) => {
    setToken(authToken);
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Login onLoginSuccess={() => setIsAuthenticated(true)} setAuthToken={setAuthToken} />}
          />
          <Route
            path="/dashboard/*"
            element={
              token ? (
                <>
                  <Sidebar visible={navVisible} show={toggleNavbar} onLogout={handleLogout} />
                  <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
                    <Dashboard token={token} />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/adicionar-produto"
            element={
              token ? (
                <>
                  <Sidebar visible={navVisible} show={toggleNavbar} onLogout={handleLogout} />
                  <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
                    <AdicionarProduto token={token} />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/atualizar/:produtoId"
            element={
              token ? (
                <>
                  <Sidebar visible={navVisible} show={toggleNavbar} onLogout={handleLogout} />
                  <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
                    <AlterarProduto token={token} />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/gerenciar-produto"
            element={
              token ? (
                <>
                  <Sidebar visible={navVisible} show={toggleNavbar} onLogout={handleLogout} />
                  <div className={!navVisible ? 'page' : 'page page-with-navbar'}>
                    <GerenciarProdutos token={token} />
                  </div>
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
