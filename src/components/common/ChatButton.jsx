/* eslint-disable react/prop-types */
function ChatButton({ roomId, onClick }) {
  return (
    <button 
      className="text-gray-100 bg-gray-500 hover:bg-gray-600 my-1 px-4 py-2 rounded-lg"
      onClick={() => onClick(roomId)}
    >
      Room {roomId}
    </button>
  );
}

export default ChatButton;
