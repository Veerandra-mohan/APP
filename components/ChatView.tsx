import React, { useState, useRef, useEffect } from 'react';
// FIX: The `LiveSession` type is not exported from the `@google/genai` library.
import { GoogleGenAI, Modality, Blob } from '@google/genai';

// Helper to encode audio data for the API
function encode(bytes: Uint8Array): string {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Helper to create a Blob object in the format the API expects
function createBlob(data: Float32Array): Blob {
    const l = data.length;
    const int16 = new Int16Array(l);
    for (let i = 0; i < l; i++) {
        int16[i] = data[i] * 32768;
    }
    return {
        data: encode(new Uint8Array(int16.buffer)),
        mimeType: 'audio/pcm;rate=16000',
    };
}


const ChatView: React.FC = () => {
    const [inputText, setInputText] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    
    // Refs to manage the audio resources and the live session
    // FIX: The `LiveSession` type is not exported. Using `any` as a fallback.
    const sessionPromiseRef = useRef<Promise<any> | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
    const mediaStreamSourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopRecording = () => {
        if (sessionPromiseRef.current) {
            sessionPromiseRef.current.then(session => session.close());
            sessionPromiseRef.current = null;
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        if (scriptProcessorRef.current) {
            scriptProcessorRef.current.disconnect();
            scriptProcessorRef.current = null;
        }
        if (mediaStreamSourceRef.current) {
            mediaStreamSourceRef.current.disconnect();
            mediaStreamSourceRef.current = null;
        }
        if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }
        setIsRecording(false);
    };

    const startRecording = async () => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;

            // FIX: Cast `window` to `any` to access the vendor-prefixed `webkitAudioContext` for broader browser compatibility, preventing a TypeScript error.
            const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            audioContextRef.current = inputAudioContext;

            setInputText(''); // Clear input on new recording

            sessionPromiseRef.current = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        const source = inputAudioContext.createMediaStreamSource(stream);
                        mediaStreamSourceRef.current = source;
                        
                        const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                        scriptProcessorRef.current = scriptProcessor;

                        scriptProcessor.onaudioprocess = (audioProcessingEvent) => {
                            const inputData = audioProcessingEvent.inputBuffer.getChannelData(0);
                            const pcmBlob = createBlob(inputData);
                            sessionPromiseRef.current?.then((session) => {
                                session.sendRealtimeInput({ media: pcmBlob });
                            });
                        };
                        source.connect(scriptProcessor);
                        scriptProcessor.connect(inputAudioContext.destination);
                    },
                    onmessage: (message) => {
                        if (message.serverContent?.inputTranscription) {
                            const text = message.serverContent.inputTranscription.text;
                            setInputText(prev => prev + text);
                        }
                    },
                    onerror: (e) => {
                        console.error('Live session error:', e);
                        stopRecording();
                    },
                    onclose: () => {
                       // Session closed. No action needed unless you want to notify the user.
                    },
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    inputAudioTranscription: {},
                },
            });

            setIsRecording(true);

        } catch (error) {
            console.error('Failed to start recording:', error);
            alert("Could not start recording. Please ensure you have given microphone permissions.");
            stopRecording();
        }
    };
    
    const handleMicClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            stopRecording();
        };
    }, []);

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
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Type your message or click the mic to speak..."
              className="w-full px-4 py-2 pr-24 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Chat input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center">
                 <button 
                    onClick={handleMicClick}
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${isRecording ? 'text-red-500 bg-red-100' : 'text-gray-500 hover:bg-gray-200'} transition-colors`}
                    aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                 >
                    {isRecording ? (
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    )}
                </button>
                <button className="flex items-center justify-center w-10 h-10 text-blue-500 hover:text-blue-700" aria-label="Send message">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChatView;