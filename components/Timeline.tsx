import React from 'react';

const TimelineLayer: React.FC<{ label: string, color: string, children?: React.ReactNode }> = ({ label, color, children }) => {
    return (
        <div className="flex items-center space-x-2 w-full">
            <span className="text-xs font-bold w-20 text-right pr-2 text-gray-600">{label}</span>
            <div className={`flex-grow h-16 border rounded ${color} flex items-center px-2`}>
                {children}
            </div>
        </div>
    );
};

const Timeline: React.FC = () => {
  return (
    <div className="w-full h-full bg-white rounded-lg shadow-md p-4 flex flex-col space-y-2">
        <h3 className="text-md font-semibold text-gray-700 pb-2 border-b">Timeline</h3>
        <div className="flex-grow flex flex-col justify-around">
            <TimelineLayer label="Voice" color="bg-green-100 border-green-300">
                <div className="bg-green-400 h-8 w-3/5 rounded-sm shadow-inner"></div>
            </TimelineLayer>
            <TimelineLayer label="Character" color="bg-purple-100 border-purple-300">
                <div className="bg-purple-400 h-8 w-4/5 ml-4 rounded-sm shadow-inner"></div>
            </TimelineLayer>
            <TimelineLayer label="Background" color="bg-yellow-100 border-yellow-300">
                <div className="bg-yellow-400 h-8 w-full rounded-sm shadow-inner"></div>
            </TimelineLayer>
        </div>
    </div>
  );
};

export default Timeline;
