/* eslint-disable react/prop-types */
function ChatButton({ roomId, onClick }) {
  return (
    <button 
      className="text-white bg-zinc-500 hover:bg-zinc-600 my-1 px-4 py-2 rounded-md"
      onClick={() => onClick(roomId)}
    >
      Room {roomId}
    </button>
  );
}

export default ChatButton;
