export interface TimelineLayer {
    id: string;
    type: 'background' | 'character' | 'voice';
    startTime: number;
    endTime: number;
    source: string; // URL or identifier for the asset
}

export interface Scene {
    id: string;
    script: string;
    timeline: TimelineLayer[];
}

export interface Video {
    id: string;
    title: string;
    scenes: Scene[];
}
