import React, { useState } from "react";

export const ChatBot = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="w-80 h-96 bg-white shadow-xl rounded-xl mb-3 border">
          <div className="p-3 border-b font-semibold">AI Assistant</div>

          <div className="p-3 text-sm">Hello 👋 How can I help you?</div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-blue-500 text-white shadow-lg hover:scale-105 transition"
      >
        💬
      </button>
    </div>
  );
};
