import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import ChatView from './components/ChatView';
import VideoEditor from './components/VideoEditor';
import CharacterEditor from './components/CharacterEditor';

export type Tab = 'chat' | 'video' | 'character';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab | null>(null);

  const renderContent = () => {
    if (!activeTab) {
      return (
        <div className="flex items-center justify-center h-full">
          <h1 className="text-2xl font-semibold text-gray-600">
            Welcome! Select a tab below to get started.
          </h1>
        </div>
      );
    }

    switch (activeTab) {
      case 'chat':
        return <ChatView />;
      case 'video':
        return <VideoEditor />;
      case 'character':
        return <CharacterEditor />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <main className="flex-grow overflow-hidden pb-16">
        {renderContent()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;
