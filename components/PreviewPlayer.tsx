import React from 'react';

const PreviewPlayer: React.FC = () => {
  return (
    <div className="w-full h-full bg-black rounded-lg flex items-center justify-center aspect-video">
        <div className="text-white text-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            <p className="mt-2 text-gray-400">Video Preview</p>
        </div>
    </div>
  );
};

export default PreviewPlayer;
