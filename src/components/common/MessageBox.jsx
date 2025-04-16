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
      <div className="flex flex-row-reverse items-start group gap-2 my-1">
        <div className="bg-gray-600 px-2 py-1 hover:bg-gray-700 rounded-md">
          <div className="flex flex-row items-baseline gap-1 whitespace-nowrap">
            <span className="text-gray-300 font-medium">{message.author}</span>
            <span className="text-gray-300 text-xs font-light">
              {message.createdAt ? "   " + convertDate(message.createdAt) : ""}
            </span>
          </div>
          <p className="text-left break-words text-gray-100">{message.content}</p>
        </div>
        <button className="mx-2 rounded bg-transparent hover:bg-slate-600 group-hover:opacity-100 opacity-0 transition-opacity duration-100">
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
      <div className="flex flex-row group items-start gap-2 my-1">
        <div className="bg-gray-500 px-2 py-1 hover:bg-gray-600 rounded-md">
          <div className="flex flex-row items-baseline gap-1 whitespace-nowrap">
            <span className="text-gray-300 font-medium">{message.author}</span>
            <span className="text-gray-300 text-xs font-light">
              {message.createdAt ? "   " + convertDate(message.createdAt) : ""}
            </span>
          </div>
          <p className="text-left break-words text-gray-100">{message.content}</p>
        </div>
        <button className="mx-2 rounded bg-transparent hover:bg-slate-600 group-hover:opacity-100 opacity-0 transition-opacity duration-200">
          <CopyIcon className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    );
  }
}

export default MessageBox;
