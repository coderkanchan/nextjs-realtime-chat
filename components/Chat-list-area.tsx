// export default function ChatListArea() {
//   return (
//     // Chat List Sidebar 
//     // <div className="w-1/4 bg-white border-r border-gray-200 shadow-md rounded-l-xl p-4 mr-4 flex flex-col">
//     //   <h3 className="text-2xl font-extrabold mb-4 text-blue-700">Conversations</h3>

//     //   <p className="text-sm font-semibold text-gray-800 mb-4">Your ID: <span className="text-blue-600 font-mono text-xs">{currentUserId || "loading..."}</span></p>

//     //   <div className="space-y-2 flex-1 flex flex-col overflow-hidden">

//     //     {/* Recent Chats Section */}
//     //     <h4 className="text-sm font-semibold text-gray-600 uppercase pt-2 border-t">Recent Chats ({chatList.length})</h4>

//     //     <div className="overflow-y-auto max-h-56 pb-2">
//     //       {chatList.map((partner) => (
//     //         <div
//     //           key={partner.id}
//     //           onClick={() => {
//     //             if (partner.id !== otherUserId) {
//     //               setOtherUserId(partner.id);
//     //             }
//     //           }}
//     //           className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${partner.id === otherUserId
//     //             ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
//     //             : 'hover:bg-gray-100'
//     //             }`}
//     //         >
//     //           <span className='flex flex-col'>
//     //             <span className="font-semibold">{partner.id}</span>
//     //             <span className="text-sm text-gray-500 truncate w-32">
//     //               {partner.lastMessage || 'Start a conversation.'}
//     //             </span>
//     //           </span>

//     //           <span className='flex items-center'>
//     //             {partner.unreadCount > 0 && (
//     //               <span className="mr-2 px-2 py-0.5 text-xs font-bold text-white bg-red-500 rounded-full">
//     //                 {partner.unreadCount}
//     //               </span>
//     //             )}
//     //             <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(partner.id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//     //           </span>
//     //         </div>
//     //       ))}

//     //       {chatList.length === 0 && (
//     //         <p className="text-sm text-gray-500 italic pt-2">No recent chats.</p>
//     //       )}
//     //     </div>

//     //     {/* 👥 NEW: All Users Section */}
//     //     <h4 className="text-sm font-semibold text-gray-600 uppercase mt-4 pt-2 border-t">All Users ({allUsers.length})</h4>
//     //     <div className="overflow-y-auto flex-1">
//     //       {allUsers.length === 0 && (
//     //         <p className="text-sm text-gray-500 italic pt-2">No other users found in database.</p>
//     //       )}
//     //       {allUsers.map((id) => {
//     //         // यदि यूज़र पहले से Recent Chats में है, तो उसे यहाँ न दिखाएँ
//     //         if (chatList.some(p => p.id === id)) return null;

//     //         return (
//     //           <div
//     //             key={id}
//     //             onClick={() => setOtherUserId(id)}
//     //             className={`p-3 rounded-lg text-black cursor-pointer transition-all flex justify-between items-center ${id === otherUserId
//     //               ? 'bg-blue-100 border-l-4 border-blue-500 font-semibold'
//     //               : 'hover:bg-gray-100'
//     //               }`}
//     //           >
//     //             <span className="font-semibold">{id}</span>
//     //             <span className={`inline-block w-2 h-2 rounded-full ${onlineStatuses.get(id) ? 'bg-green-500' : 'bg-gray-400'}`}></span>
//     //           </div>
//     //         )
//     //       })}
//     //     </div>

//     //   </div>
//     // </div>
//   )
// }