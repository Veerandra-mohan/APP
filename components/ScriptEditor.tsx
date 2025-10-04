import React from 'react';

interface ScriptEditorProps {
    value: string;
    onChange: (value: string) => void;
    onGenerate: () => void;
    isGenerating: boolean;
}

const ScriptEditor: React.FC<ScriptEditorProps> = ({ value, onChange, onGenerate, isGenerating }) => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-col">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h3 className="text-md font-semibold text-gray-700">Script Editor</h3>
          <button
              onClick={onGenerate}
              disabled={isGenerating || !value.trim()}
              className="flex items-center px-3 py-1 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Generate script with AI"
          >
              {isGenerating ? (
                  <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                  </>
              ) : (
                  <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L13.414 12l2.879 2.879a1 1 0 010 1.414L15 17m-5 4l-2.293-2.293a1 1 0 010-1.414L9.586 12 6.707 9.121a1 1 0 010-1.414L9 4" />
                      </svg>
                      Generate with AI
                  </>
              )}
          </button>
        </div>
        <textarea 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full h-full p-3 resize-none border-0 focus:ring-0 rounded-b-lg text-sm text-gray-800"
            placeholder="Write a story idea here, then click 'Generate with AI' to structure it into a script..."
            aria-label="Script editor"
        />
    </div>
  );
};

export default ScriptEditor;