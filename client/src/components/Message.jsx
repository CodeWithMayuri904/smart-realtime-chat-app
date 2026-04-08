import React from "react";

const Message = ({ message, isOwn }) => {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} group`}>
      <div
        className={`px-4 py-3 max-w-xs break-words rounded-2xl shadow-md transition-all duration-200
          ${isOwn ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white" : "bg-gray-200 text-gray-900"}
          hover:shadow-lg`}
      >
        <p>{message.text}</p>
        <span className="text-xs text-gray-400 block text-right mt-1 opacity-0 group-hover:opacity-100">
          {message.time}
        </span>
      </div>
    </div>
  );
};

export default Message;