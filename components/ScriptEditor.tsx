import React from 'react';

const ScriptEditor: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-col">
        <h3 className="text-md font-semibold text-gray-700 p-3 border-b border-gray-200">Script Editor</h3>
        <textarea 
            className="w-full h-full p-3 resize-none border-0 focus:ring-0 rounded-b-lg text-sm text-gray-800"
            placeholder="[SCENE START]&#10;EVA (on comms): We're approaching the asteroid field. All hands to stations!&#10;..."
            aria-label="Script editor"
        >
        </textarea>
    </div>
  );
};

export default ScriptEditor;
