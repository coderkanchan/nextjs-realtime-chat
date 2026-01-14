// export default function Sidebar({ currentUser, otherUser,
//   setOtherUser, chatList, allUsers, onLogout, socket }: any) {
//   //const newUsers = allUsers.filter((id: string) => id !== currentUser && !chatList.some((p: any) => p.id === id));
//   const newUsers = (allUsers || []).filter((id: string) => id !== currentUser && !(chatList || []).some((p: any) => p.id === id));

//   return (
//     <div className="w-1/4 bg-white border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
//       <div className="flex justify-between items-center mb-4">
//         <h3 className="text-xl font-bold text-blue-700">Chats</h3>
//         <button onClick={onLogout} className="text-xs text-red-500 font-bold hover:underline">LOGOUT</button>
//       </div>
//       <p className="text-xs mb-4 text-gray-500 font-mono">User: {currentUser}</p>

//       <div className="flex-1 overflow-y-auto">
//         <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recent</h4>
//         {chatList?.map((p: any) => (
//           <div key={p.id} onClick={() => setOtherUser(p.id)} className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === p.id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
//             <p className="font-semibold text-black">{p.id}</p>
//             <p className="text-xs text-gray-400 truncate">{p.lastMessage}</p>
//           </div>
//         ))}

//         <h4 className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2">All Users</h4>
//         {newUsers.map((id: string) => (
//           <div key={id} onClick={() => setOtherUser(id)} className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === id ? 'bg-blue-100' : 'hover:bg-gray-50'}`}>
//             <p className="font-semibold text-blue-600">{id}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }







export default function Sidebar({
  currentUser,
  otherUser,
  setOtherUser,
  chatList,
  allUsers,
  onLogout,
  loggingOut, // ⭐ EXTRA PRO TIP
}: any) {
  const newUsers = (allUsers || []).filter(
    (id: string) =>
      id !== currentUser &&
      !(chatList || []).some((p: any) => p.id === id)
  );

  return (
    <div className="w-1/4 bg-white border-r shadow-md rounded-l-xl p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-blue-700">Chats</h3>

        {/* ✅ PROFESSIONAL LOGOUT */}
        <button
          onClick={onLogout}
          disabled={loggingOut}
          className="text-xs text-red-500 font-bold hover:underline disabled:opacity-50"
        >
          {loggingOut ? "Logging out..." : "LOGOUT"}
        </button>
      </div>

      <p className="text-xs mb-4 text-gray-500 font-mono">
        User: {currentUser}
      </p>

      <div className="flex-1 overflow-y-auto">
        <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">
          Recent
        </h4>

        {chatList?.map((p: any) => (
          <div
            key={p.id}
            onClick={() => setOtherUser(p.id)}
            className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === p.id ? "bg-blue-100" : "hover:bg-gray-50"
              }`}
          >
            <p className="font-semibold text-black">{p.id}</p>
            <p className="text-xs text-gray-400 truncate">
              {p.lastMessage}
            </p>
          </div>
        ))}

        <h4 className="text-xs font-bold text-gray-400 uppercase mt-4 mb-2">
          All Users
        </h4>

        {newUsers.map((id: string) => (
          <div
            key={id}
            onClick={() => setOtherUser(id)}
            className={`p-3 rounded-lg cursor-pointer mb-1 ${otherUser === id ? "bg-blue-100" : "hover:bg-gray-50"
              }`}
          >
            <p className="font-semibold text-blue-600">{id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
