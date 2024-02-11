import { Routes,Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/login';
import Signup from './pages/signup';
import { Toaster } from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>} />
      <Route path="/login" element={authUser?<Navigate to="/"/>:<Login/>} />
      <Route path="/signup" element={authUser?<Navigate to="/"/>:<Signup/>} />
      {/* <Login/> */}
      {/* <Signup/> */}
      {/* <Home/> */}
      </Routes>
      <Toaster/>
      </div>  
  );
}

export default App;
