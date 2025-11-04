import { Plus } from "lucide-react";

// export default function RightSidebar() {
//   return (
//     <aside className="w-80 bg-gray-900 p-4 space-y-6 overflow-y-auto scrollbar-hide">
//       {/* Suggested Groups */}
//       <div className="bg-purple-800/40 p-4 rounded-2xl">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-sm">Suggested Groups</h3>
//           <button className="text-xs text-gray-300 hover:text-white">See All</button>
//         </div>
//         <div className="relative">
//           <img
//             src="https://picsum.photos/300/150"
//             alt="group"
//             className="rounded-xl"
//           />
//           <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1 rounded-lg">
//             Join
//           </button>
//         </div>
//         <p className="text-sm mt-3 font-medium">Matlidia Nefalciola Secens</p>
//         <p className="text-[10px] text-gray-400">356 Members</p>
//       </div>

//       {/* Suggested Friends */}
//       <div className="bg-purple-800/40 p-4 rounded-2xl">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-sm">Suggested Friends</h3>
//           <button className="text-xs text-gray-300 hover:text-white">See All</button>
//         </div>
//         <div className="space-y-3">
//           {[1, 2, 3, 4].map((i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between bg-purple-900/40 p-2 rounded-xl"
//             >
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={`https://i.pravatar.cc/40?img=${i + 30}`}
//                   alt="friend"
//                   className="w-10 h-10 rounded-lg"
//                 />
//                 <div>
//                   <p className="text-[13px] font-medium">Jackson Britsons</p>
//                   <p className="text-[10px] text-gray-400">Creator & Editor</p>
//                 </div>
//               </div>
//               <button className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg">
//                 <Plus size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Featured Creators */}
//       <div className="bg-purple-800/40 p-4 rounded-2xl">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-sm">Featured Creators</h3>
//           <button className="text-[10px] text-gray-300 hover:text-white">See All</button>
//         </div>
//         <div className="space-y-3">
//           {[5, 6].map((i) => (
//             <div
//               key={i}
//               className="flex items-center justify-between bg-purple-900/40 p-2 rounded-xl"
//             >
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={`https://i.pravatar.cc/40?img=${i + 40}`}
//                   alt="creator"
//                   className="w-10 h-10 rounded-lg"
//                 />
//                 <div>
//                   <p className="text-[13px] font-medium">Jackson Britsons</p>
//                   <p className="text-[10px] text-gray-400">Creator & Editor</p>
//                 </div>
//               </div>
//               <button className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg">
//                 <Plus size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </aside>
//   );
// }
export default function RightSidebar() {
  return (
    <aside className="hidden lg:block w-80 bg-gray-900 p-4 space-y-6 overflow-y-auto scrollbar-hide">
      {/* Suggested Groups */}
      <div className="bg-purple-800/40 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Suggested Groups</h3>
          <button className="text-xs text-gray-300 hover:text-white">See All</button>
        </div>
        <div className="relative">
          <img
            src="https://picsum.photos/300/150"
            alt="group"
            className="rounded-xl"
          />
          <button className="absolute bottom-3 right-3 bg-purple-600 hover:bg-purple-700 text-xs px-3 py-1 rounded-lg">
            Join
          </button>
        </div>
        <p className="text-sm mt-3 font-medium">Matlidia Nefalciola Secens</p>
        <p className="text-[10px] text-gray-400">356 Members</p>
      </div>

      {/* Suggested Friends */}
      <div className="bg-purple-800/40 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Suggested Friends</h3>
          <button className="text-xs text-gray-300 hover:text-white">See All</button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-purple-900/40 p-2 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 30}`}
                  alt="friend"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="text-[13px] font-medium">Jackson Britsons</p>
                  <p className="text-[10px] text-gray-400">Creator & Editor</p>
                </div>
              </div>
              <button className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg">
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Creators */}
      <div className="bg-purple-800/40 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-sm">Featured Creators</h3>
          <button className="text-[10px] text-gray-300 hover:text-white">See All</button>
        </div>
        <div className="space-y-3">
          {[5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-purple-900/40 p-2 rounded-xl"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={`https://i.pravatar.cc/40?img=${i + 40}`}
                  alt="creator"
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <p className="text-[13px] font-medium">Jackson Britsons</p>
                  <p className="text-[10px] text-gray-400">Creator & Editor</p>
                </div>
              </div>
              <button className="bg-purple-700 hover:bg-purple-600 p-2 rounded-lg">
                <Plus size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
