import { useEffect, useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";
import MessageBox from "../components/common/MessageBox";
import ChatButton from "../components/common/ChatButton";
import SearchIcon from "../assets/search.svg?react";
import SendIcon from "../assets/send.svg?react";
import OpenSidebarIcon from "../assets/open-sidebar.svg?react";
import CloseSidebarIcon from "../assets/close-sidebar.svg?react";
import { useAuth } from "../components/sections/AuthContext.jsx";

const ServerLocation = import.meta.env.VITE_API_BASE_URL;

function ChatApp() {
  const socketRef = useRef(null);
  const messageContainerRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [roomId, setRoomId] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { username } = useAuth(); // Assuming you have a way to get the username from context

  async function fetchMessages(roomId) {
    try {
      const res = await fetch(ServerLocation + `api/messages/${roomId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      if (!res.ok) console.log("error fetching");
      const data = await res.json();
      setMessages(data);
    } catch {
      console.error("Fetch error");
    }
  }

  useEffect(() => {
    socketRef.current = io(ServerLocation);

    socketRef.current.on("message", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socketRef.current.emit("joinRoom", 1);
    fetchMessages(1);

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socketRef.current === null) return;
    socketRef.current.emit("joinRoom", roomId);
    fetchMessages(roomId);
  }, [roomId]);

  useEffect(() => {
    messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
  }, [messages])

  function sendMessage(content) {
    if (socketRef.current && content.trim()) {
      socketRef.current.emit("message", {
        content: content,
        author: username,
        roomId: roomId,
      });
      setNewMessage("");
    }
  }

  function handleInputChange(e) {
    setNewMessage(e.target.value);
  }

  function handleRoomChange(roomId) {
    console.log(`room ${roomId}`);
    socketRef.current.emit("leaveRoom", roomId);
    setRoomId(roomId);
    // needs more things afterwards
  }

  return (
    <div className="bg-zinc-100 flex h-full min-h-0">
      <aside
        className={
          (sidebarOpen ? "w-1/6" : "w-20") +
          " flex flex-col bg-zinc-300 rounded-lg p-4 m-1 border-2 gap-1 border-neutral-300"
        }
      >
        {sidebarOpen ? (
          <button
            className="rounded bg-transparent"
            onClick={() => setSidebarOpen(false)}
          >
            <CloseSidebarIcon className="w-10 h-10" />
          </button>
        ) : (
          <button
            className="rounded bg-transparent"
            onClick={() => setSidebarOpen(true)}
          >
            <OpenSidebarIcon className="w-10 h-10" />
          </button>
        )}
        {sidebarOpen && 
          [1, 2, 3].map((roomId) => (
            <ChatButton key={roomId} roomId={roomId} onClick={handleRoomChange} />
          ))
        }
      </aside>
      <main className="flex-grow flex flex-col m-1 rounded-lg border-neutral-300 border-2 bg-gray-300 min-h-0">
        {" "}
        {/* Add min-h-0 here */}
        <header className="h-12 flex-shrink-0 flex items-center justify-between bg-gray-500 p-4 m-1 border-neutral-300 border-1 rounded-lg">
          <h3 className="text-gray-100 text-lg font-semibold">
            {"Chat Room " + roomId}
          </h3>
          <div className="flex items-center gap-3 justify-end w-1/4 pr-1">
            <button className="p-1 rounded bg-transparent">
              <SearchIcon className="w-7 h-7 text-white" />
            </button>
          </div>
        </header>
        <section ref={messageContainerRef} className="flex-1 min-h-0 overflow-y-auto p-4">
          {" "}
          {/* Add min-h-0 here */}
          {messages.map((message) => (
            <div
              key={uuidv4()}
              className={
                username === message.author
                  ? "flex justify-end"
                  : "flex justify-start"
              }
            >
              <MessageBox message={message} />
            </div>
          ))}
        </section>
        <footer className="h-14 flex-shrink-0 flex items-center gap-2 px-2 py-0 m-1 rounded-lg bg-gray-400">
          <input
            type="text"
            id="messageInput"
            placeholder="Write a message"
            value={newMessage}
            onChange={handleInputChange}
            className="flex-1 px-2 py-2 text-md rounded-lg bg-gray-500 text-white placeholder-gray-200"
          />
          <button
            onClick={() => sendMessage(newMessage)}
            className="p-2 bg-gray-500 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <SendIcon className="w-7 h-7" />
          </button>
        </footer>
      </main>
    </div>
  );
}

export default ChatApp;
