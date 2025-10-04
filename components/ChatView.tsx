import React from 'react';

const ChatView: React.FC = () => {
  return (
    <div className="flex h-full bg-white">
      {/* Chat History Panel */}
      <aside className="w-1/3 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Chat History</h2>
        </div>
        <ul className="overflow-y-auto flex-grow">
          {['General Conversation', 'Story Brainstorm', 'Character Dialogue'].map((chat, index) => (
             <li key={index} className={`p-4 cursor-pointer hover:bg-gray-100 ${index === 0 ? 'bg-blue-50 border-r-4 border-blue-500' : ''}`}>
               <p className="font-semibold text-gray-700">{chat}</p>
               <p className="text-sm text-gray-500 truncate">Last message was...</p>
             </li>
          ))}
        </ul>
      </aside>

      {/* Main Chat Panel */}
      <section className="w-2/3 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-grow p-6 overflow-y-auto">
            <div className="flex flex-col space-y-4">
                {/* AI Message */}
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold">AI</div>
                    <div className="p-3 bg-gray-200 rounded-lg rounded-tl-none">
                        <p className="text-sm text-gray-800">Hello! How can I help you create today?</p>
                    </div>
                </div>
                {/* User Message */}
                <div className="flex items-start space-x-3 justify-end">
                     <div className="p-3 bg-blue-500 text-white rounded-lg rounded-br-none">
                        <p className="text-sm">I want to write a story about a space pirate.</p>
                    </div>
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">You</div>
                </div>
            </div>
        </div>
        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Type your message..."
              className="w-full px-4 py-2 pr-12 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Chat input"
            />
            <button className="absolute inset-y-0 right-0 flex items-center justify-center w-10 h-10 text-blue-500 hover:text-blue-700" aria-label="Send message">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatView;
