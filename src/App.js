import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import LeftSidebar from './components/Sidebar/LeftSidebar';
import MiniSidebar from './components/Sidebar/MiniSidebar';
import MobileSidebar from './components/Sidebar/MobileSidebar';
import RightSidebar from './components/Sidebar/RightSidebar';
import Feed from './components/Feed/Feed';
import LandingPage from './components/Landing/LandingPage';
import { useStateContext } from './context/index';

function App() {
  const { account } = useStateContext();
  const [showLanding, setShowLanding] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (account) {
      setShowLanding(false);
    }
  }, [account]);

  if (showLanding && !account) {
    return <LandingPage />;
  }

  return (
    <div className="flex h-screen bg-gradient-to-r from-purple-900 to-black text-white font-sans">
      {/* Mobile Sidebar */}
      <MobileSidebar isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      {/* Left sidebars - Desktop only */}
      <div className="hidden md:flex">
        <MiniSidebar />
        <LeftSidebar />
      </div>

      {/* Middle (Feed + Navbar) */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="flex flex-1 overflow-hidden">
          {/* Feed */}
          <div className="flex-1 p-2 overflow-y-auto scrollbar-hide">
            <Feed />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:flex lg:flex-col h-full">
            <RightSidebar />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
