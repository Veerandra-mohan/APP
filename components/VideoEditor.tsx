import React from 'react';
import PreviewPlayer from './PreviewPlayer';
import ScriptEditor from './ScriptEditor';
import StoryList from './StoryList';
import Timeline from './Timeline';

const VideoEditor: React.FC = () => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4 bg-gray-100">
        {/* Header with Controls */}
        <header className="flex items-center justify-between pb-2 border-b border-gray-300">
            <h1 className="text-xl font-bold text-gray-800">Video Editor</h1>
            <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Undo</button>
                <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Redo</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
            </div>
        </header>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 h-full overflow-hidden">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    <PreviewPlayer />
                    <ScriptEditor />
                </div>
                 <StoryList />
            </div>

            {/* Right Column (Timeline) */}
            <div className="lg:col-span-1">
                 <Timeline />
            </div>
        </div>
    </div>
  );
};

export default VideoEditor;
