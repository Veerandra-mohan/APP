export interface Character {
    id: string;
    name: string;
    traits: string;
    appearance: string;
}

export interface Story {
    id: string;
    title: string;
    characters: Character[];
}
