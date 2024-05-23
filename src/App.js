import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import Search from './Components/Search';
import Fvrts from './Components/Fvrts'; // Assuming Fvrts is the component to display saved images
import Auth from './Components/Auth';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search/:query" element={<Search />} />
      <Route path="/fvrts" element={<Fvrts />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
