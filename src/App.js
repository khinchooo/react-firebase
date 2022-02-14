import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
      <SignUp />
    </div>
  );
}

export default App;
