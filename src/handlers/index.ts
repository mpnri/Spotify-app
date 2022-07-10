import { DataType, MusicType } from "../types";

export const modifyMusic = (id : string, modify : Function) => {
    const database = indexedDB.open('data', 1);
    database.addEventListener('success', e => {
        const db = database.result;
        const transaction = db.transaction('albums', "readwrite");
        const store = transaction.objectStore('albums');
        const albums = store.getAll();
        albums.addEventListener('success', e => {
            const data = albums.result.find(item => item.musics.find(elm => +elm.id === +id)) as DataType;
            const music = data.musics.find(music => +music.id === +id) as MusicType;
            modify(music);
            store.put(data);
        })
    });
}