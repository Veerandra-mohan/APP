import React from 'react';
import { Story } from '../types/story';

const mockStories: Story[] = [
    { id: '1', title: 'The Nebula Pirate', characters: [] },
    { id: '2', title: 'Chronos Heist', characters: [] },
    { id: '3', title: 'Echoes of Mars', characters: [] },
];

const StoryList: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
        <h3 className="text-md font-semibold text-gray-700 mb-2">Stories</h3>
        <ul className="space-y-2">
            {mockStories.map((story, index) => (
                <li key={story.id} className={`p-2 rounded-md cursor-pointer ${index === 0 ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'}`}>
                    {story.title}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default StoryList;
