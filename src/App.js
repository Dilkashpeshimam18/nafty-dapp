import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom'
import Register from './components/Profile/RegisterProfile';
import EditProfile from './components/Profile/EditProfile';
import Navbar from './components/Navbar/Navbar';
import CreatePost from './components/NFTPost/CreatePost'

function App() {
  return (
    <div className="app">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-profile' element={<Register />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
