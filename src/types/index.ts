export type MusicType = {
    "id": number;
    "track_name": string;
    "track_time": string;
    "track_url": string;
    "track_thumb": string;
    "is_liked": boolean;
    "is_searched": boolean | number;
    "is_downloaded": boolean;
    "is_played": boolean | number
}

export type AlbumType = {
    "id": string;
    "album_name": string;
    "album_composer": string;
    "album_genre": string;
    "album_thumb": string;
    "album_url": string;
    "is_searched": boolean | number;
}

export type TabType = 'albums' | 'artists' | 'playlists';

export type DataType = { album: AlbumType, musics: MusicType[], length: number, id: string };