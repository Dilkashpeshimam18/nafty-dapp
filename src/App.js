import './App.css';
import Home from './components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Profile/RegisterProfile';
import EditProfile from './components/Profile/EditProfile';
import Navbar from './components/Navbar/Navbar';
import CreatePost from './components/NFTPost/CreatePost';
import LeftSidebar from './components/Sidebar/LeftSidebar';
import MiniSidebar from './components/Sidebar/MiniSidebar';
import RightSidebar from './components/Sidebar/RightSidebar';
import Feed from './components/Feed/Feed';
function App() {
  return (
    // <div className="app">
    //   <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
    //     <Navbar />
    //     <Routes>
    //       <Route path='/' element={<Home />} />
    //       <Route path='/create-profile' element={<Register />} />
    //       <Route path='/edit-profile' element={<EditProfile />} />
    //       <Route path='/create-post' element={<CreatePost />} />
    //     </Routes>
    //   </div>
    // </div>
  <div className="flex h-screen bg-gradient-to-r from-purple-900 to-black text-white font-sans">
  {/* Left sidebars */}
  <MiniSidebar />
  <LeftSidebar />

  {/* Middle (Feed + Navbar) */}
  <div className="flex flex-col flex-1 overflow-hidden">
    <Navbar />
    <main className="flex flex-1 overflow-hidden">
      {/* Feed */}
      <div className="flex-1 p-2 overflow-y-auto scrollbar-hide">
        <Feed />
      </div>

      {/* Right Sidebar */}
      <RightSidebar />
    </main>
  </div>
</div>

  );
}

export default App;
