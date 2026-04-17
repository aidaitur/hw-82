export interface User {
    _id: string;
    username: string;
    token: string;
    role: string;
    displayName: string;
    avatar: string | null;
    googleID?: string;
}

export interface RegisterMutation {
    username: string;
    password: string;
    displayName: string;
    avatar: File | null;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}


export interface LoginMutation {
    username: string;
    password: string;
}

export interface TrackHistoryItem {
    _id: string;
    title: string;
    artistName?: string;
    playedAt: string;
}

export interface Track {
    _id: string;
    title: string;
    duration: string;
    trackNumber: number;
    album: string;
}

export interface Album {
    _id: string;
    title: string;
    artist: Artist;
    year: number;
    image: string | null;
}

export interface Artist {
    _id: string;
    name: string;
    photo: string | null;
    information: string | null;
}