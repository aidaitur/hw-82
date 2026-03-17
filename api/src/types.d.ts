export interface ArtistMutation {
    name: string;
    photo?: string | null;
    information?: string | null;
}

export interface AlbumMutation {
    title: string;
    artist: string;
    year: number;
    cover?: string | null;
}

export interface TrackMutation {
    title: string;
    album: string;
    duration: string;
}