/* eslint-disable react/prop-types */

import { useAuth } from "../sections/AuthContext.jsx";

import CopyIcon from "../../assets/copy.svg?react";

function MessageBox({ message }) {
  const convertDate = (date) => {
    const options = {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(date).toLocaleString("en-US", options);
  };

  const { username } = useAuth();

  if (username === message.author) {
    // user message
    return (
      <div className="flex flex-row-reverse items-start group">
        <div className="bg-zinc-700 pl-2 pr-2 py-1 max-w-[70%] hover:bg-slate-600 rounded-md">
          <div className="flex flex-row items-baseline gap-1 whitespace-nowrap">
            <span className="text-zinc-400 font-medium">{message.author}</span>
            <span className="text-zinc-400 text-xs font-light">
              {message.createdAt ? "   " + convertDate(message.createdAt) : ""}
            </span>
          </div>
          <p className="text-left break-words">{message.content}</p>
        </div>
        <button className="my-5 mx-2 rounded bg-transparent hover:bg-slate-600 group-hover:opacity-100 opacity-0 transition-opacity duration-100">
          <CopyIcon className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    );
  } else if (message.author == "system") {
    // system message
    return (
      <div className="hover:bg-slate-600">
        <p className="text-slate-400">{message.author}</p>
        <p className="text-center break-words">{message.content}</p>
      </div>
    );
  } else {
    // other user message
    return (
      <div className="flex flex-row group items-start my-1">
        <div className="bg-zinc-700 pl-2 pr-5 py-1 max-w-[70%] hover:bg-slate-600 rounded-md">
          <div className="flex flex-row items-baseline gap-1 whitespace-nowrap">
            <span className="text-zinc-400 font-medium">{message.author}</span>
            <span className="text-zinc-400 text-xs font-light">
              {message.createdAt ? "   " + convertDate(message.createdAt) : ""}
            </span>
          </div>
          <p className="text-left break-words">{message.content}</p>
        </div>
        <button className="mx-2 rounded bg-transparent hover:bg-slate-600 group-hover:opacity-100 opacity-0 transition-opacity duration-200">
          <CopyIcon className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    );
  }
}

export default MessageBox;
