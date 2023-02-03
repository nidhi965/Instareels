
import './App.css';
import Signup from './Components/Signup';
import {BrowserRouter,Routes,Route}from "react-router-dom";
import Login from './Components/Login';
import { AuthProvider } from './Context/AuthContext';
import Feed from './Components/Feed'
import Forgot from './Components/Forgot';
import Profile from './Components/Profile';
import Ioa from './Components/Ioa';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
    <Routes>
   <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/feed" element={<Feed/>}/>
    <Route path="/forgot" element={<Forgot/>}/>
    <Route path="/profile" element={<Profile/>}/>
</Routes>
</AuthProvider>

  </BrowserRouter>
 

  );
}

export default App;
