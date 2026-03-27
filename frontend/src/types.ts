export interface Artist {
    _id: string;
    name: string;
    photo: string;
}

export interface Album {
    _id: string;
    title: string;
    cover: string;
    year: number;
    artist?: { name: string };
    tracksCount?: number;
}

export interface Track {
    _id: string;
    title: string;
    duration: string;
    trackNumber: number;
}