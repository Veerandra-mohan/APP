import React from 'react';
import { Tab } from '../App';

interface BottomNavProps {
  activeTab: Tab | null;
  setActiveTab: (tab: Tab) => void;
}

const NavItem: React.FC<{
  label: string;
  tabName: Tab;
  isActive: boolean;
  onClick: (tab: Tab) => void;
  // Fix: Replaced JSX.Element with React.ReactElement to resolve namespace error.
  icon: React.ReactElement;
}> = ({ label, tabName, isActive, onClick, icon }) => {
  const activeClass = 'text-blue-500';
  const inactiveClass = 'text-gray-500 hover:text-blue-500';

  return (
    <button
      onClick={() => onClick(tabName)}
      className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-colors duration-200 ${isActive ? activeClass : inactiveClass}`}
      aria-current={isActive ? 'page' : undefined}
    >
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
};


const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 flex justify-around bg-white border-t border-gray-200 shadow-md">
       <NavItem
        label="Chat"
        tabName="chat"
        isActive={activeTab === 'chat'}
        onClick={setActiveTab}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
      />
      <NavItem
        label="Video"
        tabName="video"
        isActive={activeTab === 'video'}
        onClick={setActiveTab}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
      />
      <NavItem
        label="Character"
        tabName="character"
        isActive={activeTab === 'character'}
        onClick={setActiveTab}
        icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
      />
    </nav>
  );
};

export default BottomNav;