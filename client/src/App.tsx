import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContext from "./AuthContext";
import ListOfUsers from "./Components/ListOfUsers";
import Login from "./Components/Login";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import CreateUser from "./Components/CreateUser";
import UpdateUser from "./Components/UpdateUser";
import './App.css';

// Configuración del cliente de Apollo
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };
  //Configuracion de router, se envuelve en el client para tener conexion con apollo/graphql todo el tiempo.
  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/list-of-users" element={<ListOfUsers />} />
            <Route path="/crear-usuario" element={<CreateUser />} />
            <Route path="/" element={isLoggedIn ? <ListOfUsers /> : <Login />} />
            <Route path="/editar-usuario/:userId" element={<UpdateUser />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ApolloProvider>
  );
};

export default App;