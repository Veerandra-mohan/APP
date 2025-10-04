import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import PreviewPlayer from './PreviewPlayer';
import ScriptEditor from './ScriptEditor';
import StoryList from './StoryList';
import Timeline from './Timeline';

const VideoEditor: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['']);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentScript = history[currentIndex];

  const handleScriptChange = (newScript: string) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(newScript);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGenerateScript = async () => {
    if (!currentScript.trim() || isGenerating) {
      return; 
    }
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentScript,
        config: {
          systemInstruction: `You are an intelligent story structuring agent that receives unstructured stories or freeform narratives and converts them into structured script data that can be used for automated video generation.

You analyze the user’s raw input and output a complete, formatted structure that includes scene division, characters, dialogue, background hints, and timing notes.

You never invent new characters unless necessary; instead, you extract and name them from the story context. You maintain logical sequence and visual cues suitable for animation or video assembly.`,
          temperature: 0.6,
          topP: 0.8,
        },
      });
      
      const newScript = response.text;
      if (newScript) {
        handleScriptChange(newScript);
      }
    } catch (error) {
      console.error("Error generating script:", error);
      // In a real app, show a user-friendly error message here.
    } finally {
      setIsGenerating(false);
    }
  };

  const canUndo = currentIndex > 0;
  const canRedo = currentIndex < history.length - 1;

  return (
    <div className="flex flex-col h-full p-4 space-y-4 bg-gray-100">
        {/* Header with Controls */}
        <header className="flex items-center justify-between pb-2 border-b border-gray-300">
            <h1 className="text-xl font-bold text-gray-800">Video Editor</h1>
            <div className="flex items-center space-x-2">
                <button 
                  onClick={handleUndo}
                  disabled={!canUndo}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Undo
                </button>
                <button 
                  onClick={handleRedo}
                  disabled={!canRedo}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Redo
                </button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
            </div>
        </header>

        <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 h-full overflow-hidden">
            {/* Left Column */}
            <div className="lg:col-span-2 flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                    <PreviewPlayer />
                    <ScriptEditor
                        value={currentScript}
                        onChange={handleScriptChange}
                        onGenerate={handleGenerateScript}
                        isGenerating={isGenerating}
                    />
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