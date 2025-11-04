import './App.css';

import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/Sidebar/LeftSidebar';
import MiniSidebar from './components/Sidebar/MiniSidebar';
import RightSidebar from './components/Sidebar/RightSidebar';
import Feed from './components/Feed/Feed';
function App() {
  return (

  <div className="flex h-screen bg-gradient-to-r from-purple-900 to-black text-white font-sans">
  {/* Left sidebars */}
   <div className="hidden md:flex">
    <MiniSidebar />
    <LeftSidebar />
  </div>

  {/* Middle (Feed + Navbar) */}
  <div className="flex flex-col flex-1 overflow-hidden">
    <Navbar />
    <main className="flex flex-1 overflow-hidden">
      {/* Feed */}
      <div className="flex-1 p-2 overflow-y-auto scrollbar-hide">
        <Feed />
      </div>

      {/* Right Sidebar */}
 <div className="hidden lg:block">
        <RightSidebar />
      </div>    </main>
  </div>
</div>

  );
}

export default App;
