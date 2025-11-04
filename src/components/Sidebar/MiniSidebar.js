import { Home, Layers, MessageSquare, Settings } from "lucide-react";

export default function MiniSidebar() {
  return (
    <aside className="hidden md:flex w-16 bg-purple-800/40  flex-col items-center py-6 space-y-8">
      {/* Logo */}
      <div style={{fontFamily:'monospace'}} className="text-white font-bold text-md">NAFTY</div>

      {/* Nav Icons */}
      <nav className="flex flex-col space-y-6 text-gray-300">
        <button className="p-3 rounded-xl hover:bg-purple-700/40">
          <Home size={20} />
        </button>
        <button className="p-3 rounded-xl hover:bg-purple-700/40">
          <Layers size={20} />
        </button>
        <button className="p-3 rounded-xl hover:bg-purple-700/40">
          <MessageSquare size={20} />
        </button>
        <button className="p-3 rounded-xl hover:bg-purple-700/40">
          <Settings size={20} />
        </button>
      </nav>
    </aside>
  );
}
