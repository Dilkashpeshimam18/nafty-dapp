import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom'
import Register from './components/Profile/RegisterProfile';
import EditProfile from './components/Profile/EditProfile';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-profile' element={<Register />} />
        <Route path='/edit-profile' element={<EditProfile/>} />

      </Routes>
    </div>
  );
}

export default App;
