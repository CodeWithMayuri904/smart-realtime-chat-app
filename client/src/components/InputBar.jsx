function InputBar({ message, setMessage, sendMessage, handleTyping, disabled }) {
  return (
    <div className="flex items-center gap-2 bg-gray-900 p-2 rounded-xl">

      <input
        className="flex-1 bg-transparent outline-none px-3"
        value={message}
        disabled={disabled}
        onChange={(e) => {
          setMessage(e.target.value);
          handleTyping();
        }}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type a message..."
      />

      <button
        onClick={sendMessage}
        disabled={disabled}
        className="bg-blue-500 px-4 py-2 rounded-lg disabled:bg-gray-700"
      >
        Send
      </button>
    </div>
  );
}

export default InputBar;