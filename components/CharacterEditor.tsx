import React from 'react';
import StoryList from './StoryList';

const CharacterEditor: React.FC = () => {
  return (
    <div className="h-full p-4 overflow-y-auto bg-gray-100">
        <h1 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-300 mb-4">Character Editor</h1>
        
        <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">Select a Story</h2>
            <StoryList />
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Character: "Captain Eva"</h2>
            <form className="space-y-4">
                <div>
                    <label htmlFor="char-name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" id="char-name" defaultValue="Captain Eva" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="char-traits" className="block text-sm font-medium text-gray-700">Traits</label>
                    <textarea id="char-traits" rows={3} defaultValue="Brave, quick-witted, loyal to her crew." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
                <div>
                    <label htmlFor="char-appearance" className="block text-sm font-medium text-gray-700">Appearance</label>
                    <textarea id="char-appearance" rows={3} defaultValue="Cybernetic eye, long blue coat, carries a plasma pistol." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Save Character
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default CharacterEditor;
