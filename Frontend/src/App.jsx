import React from 'react';
import { IoMdSend } from "react-icons/io";

const Chatbot = () => {
  const [messages, setMessages] = React.useState([]);
  // const messages = [
  //   { type: 'user', text: 'Hello, what can you do? 🤔' },
  //   { type: 'bot', text: 'I can help you understand your documents better! 📄✨' },
  //   { type: 'user', text: 'How do I upload a document? 📤' },
  //   { type: 'bot', text: 'Just click the upload button on your dashboard.' },
  //   { type: 'user', text: 'Can you summarize the document for me? 📝' },
  //   { type: 'bot', text: 'Yes! I can provide a summary of the document’s content. 🔍' },
  //   { type: 'user', text: 'That’s cool! What formats do you support?' },
  //   { type: 'bot', text: 'I currently support PDF, DOCX, and TXT formats. ✔️' },
  //   { type: 'user', text: 'Is my data safe here? 🔒' },
  //   { type: 'bot', text: 'Absolutely! Your documents are encrypted and processed securely. 🛡️' },
  //   { type: 'user', text: 'Can you help me find keywords in the text?' },
  //   { type: 'bot', text: 'Yes! I can highlight important keywords and phrases. 📚' },
  //   { type: 'user', text: 'Can you answer questions based on the document?' },
  //   { type: 'bot', text: 'Of course! Just ask after uploading the document. 🤖' },
  //   { type: 'user', text: 'Thanks, that helps a lot. 🙌' },
  //   { type: 'bot', text: 'You’re welcome! I’m here whenever you need help 😊' }
  // ];

  const handleSend = () => {
    alert("Send functionality is under construction! 🚧");
  };

  return (
    <div className="flex flex-col w-full h-full relative bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl overflow-hidden">
      <h2 className="text-xl font-bold text-indigo-600 mb-2 p-4 bg-white shadow sticky top-0 z-10">
        🤖 Smart Chat Assistant
      </h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 px-4 py-2 mb-24">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex flex-col ${msg.type === 'user' ? 'items-end' : 'items-start'}`}
          >
            <span className={`text-xs mb-1 ${msg.type === 'user' ? 'text-indigo-500' : 'text-pink-500'}`}>
              {msg.type === 'user' ? 'You' : 'SmartBot'}
            </span>
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] shadow-lg text-sm whitespace-pre-line ${
                msg.type === 'user'
                  ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                  : 'bg-white text-gray-800 border border-gray-200'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-white border-t shadow-lg">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type your question here... 💬"
            className="w-full border border-gray-300 rounded-full py-2 px-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <IoMdSend
            onClick={handleSend}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-2xl text-purple-600 hover:scale-110 transition cursor-pointer"
            title="Send"
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;