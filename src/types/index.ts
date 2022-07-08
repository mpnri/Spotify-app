export type MusicType = {
    "id": number;
    "track_name": string;
    "track_time": string;
    "track_url": string;
    "track_thumb": string;
    "is_liked": boolean | undefined;
}

export type AlbumType = {
    "id": string;
    "album_name": string;
    "album_composer": string;
    "album_genre": string;
    "album_thumb": string;
    "album_url": string;
}

export type TabType = 'albums' | 'artists' | 'playlists';

export type DataType = { album: AlbumType, musics: MusicType[], length: number };