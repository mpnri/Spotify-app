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

export const actionSettings = (name : string, modify : Function, action: 'readwrite' | 'readonly' = 'readwrite') => {
    const database = indexedDB.open('data', 1);
    database.addEventListener('success', e => {
        const db = database.result;
        const transaction = db.transaction('settings', action);
        const store = transaction.objectStore('settings');
        const settings = store.get(name);
        settings.addEventListener('success', e => {
            const res = settings.result;
            modify(res);
            if (action === 'readwrite')
                store.put(res);
        })
    });
}

export const actionAlbum = (id : string, modify : Function, action: 'readwrite' | 'readonly' = 'readwrite') => {
    const database = indexedDB.open('data', 1);
    database.addEventListener('success', e => {
        const db = database.result;
        const transaction = db.transaction('albums', action);
        const store = transaction.objectStore('albums');
        const album = store.get(id);
        album.addEventListener('success', e => {
            const res = album.result;
            modify(res);
            console.log(res, action === 'readwrite');
            
            if (action === 'readwrite')
                store.put(res).onsuccess = () => console.log('baleeeeeeeeeeeeeeeeeeee');
                
        })
    });
}

export const getAlbums = (modify : Function) => {
    const database = indexedDB.open('data', 1);
    database.addEventListener('success', e => {
        const db = database.result;
        const transaction = db.transaction('albums', 'readonly');
        const store = transaction.objectStore('albums');
        const albums = store.getAll();
        albums.addEventListener('success', e => {
            const res = albums.result;
            modify(res);
        })
    });
}