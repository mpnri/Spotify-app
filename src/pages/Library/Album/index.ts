import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';
import like from '../../../assets/icons/like.svg';
import liked from '../../../assets/icons/liked.svg';

import Profile from "./Profile";
import { DataType, MusicType } from "../../../types";
import { modifyMusic } from "../../../handlers";

const Album = (item : DataType) => {
    return (''
        + '<div class="fade album-fade"></div>'
        + `<div class="back-icon"><img src="${back}" alt="back"></div>`
        + Profile(item)
        + Menu('search')
    );
};

const AlbumAux = ({ id }: { id: string }) => {
    return new Promise<string>((resolve, reject) => {
        const database = indexedDB.open('data', 1);
        database.addEventListener('success', e => {
            const db = database.result;
            const transaction = db.transaction('albums', "readonly");
            const store = transaction.objectStore('albums');
            const album = store.get(id);
            album.addEventListener('success', e => {
                resolve(Album(album.result))
            })
        });
    })
}

export const albumLogic = ({ id }: { id: string }) => {
    const likeBtn = document.querySelector('.profile .profile-like') as HTMLImageElement;
    const database = indexedDB.open('data', 1);
    database.addEventListener('success', e => {
        const db = database.result;
        likeBtn.addEventListener('click', e => {            
            const transaction = db.transaction('albums', "readwrite");
            const store = transaction.objectStore('albums');
            const album = store.get(id);
            album.addEventListener('success', e => {
                const res = album.result as DataType;
                let is_like = false;
                if (likeBtn.src === liked) {
                    likeBtn.src = like;
                    is_like = false;
                } else {
                    likeBtn.src = liked;
                    is_like = true;
                }
                
                res.musics.forEach(music => {
                    music.is_liked = is_like;
                })
                console.log(res);
                
                store.put(res);
            })
        });
    });
}

export default AlbumAux;