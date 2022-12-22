import React from 'react';
import './App.css';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Register from './components/register'
import Login from './components/login'
import Update from './components/update'

const App: React.FC = () => {
  return (
    <>
    <h1>I am working fine</h1>
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/update' element={<Update />}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}


export default App;
