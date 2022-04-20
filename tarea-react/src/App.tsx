import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <Router>
      <Navbar/>
      <Container>
        <Routes>
          <Route path = '/' element={<Home/>} />
          <Route path = '/pokemon/:name' element={<PokemonDetails/>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
