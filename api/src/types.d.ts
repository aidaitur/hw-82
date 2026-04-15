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
    number: number;
    duration: string;
}
export interface UserFields {
    username: string;
    password?: string;
    displayName: string;
    avatar?: string | null;
    googleID?: string | null;
    token: string;
}

export interface IUser {
    _id: string;
    username: string;
    password?: string;
    token: string;
    role: 'user' | 'admin';
    displayName: string;
    googleID?: string;
    avatar?: string | null;
}

export interface UserMethods {
    generateToken(): void;
}

export type UserModel = Model<IUser, {}, UserMethods>;