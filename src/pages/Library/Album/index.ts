import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';
import like from '../../../assets/icons/like.svg';
import liked from '../../../assets/icons/liked.svg';

import Profile from "./Profile";
import { DataType, MusicType } from "../../../types";
import { actionSettings, getAlbums, modifyMusic } from "../../../handlers";

const Album = (item : DataType, settings) => {
    return (''
        + '<div class="fade album-fade"></div>'
        + `<div class="back-icon"><img src="${back}" alt="back"></div>`
        + Profile(item, settings)
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
                actionSettings('player', settings => {
                    resolve(Album(album.result, settings))
                }, 'readonly')
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

    const playBtn = document.querySelector('.play-box > .play-btn') as HTMLDivElement;
    playBtn.addEventListener('click', e => {
        actionSettings('player', ({is_shuffle}) => {
            getAlbums((data:DataType[]) => {
                const album = data.find(item => +item.id === +id)!
                let nextInd = 0;                        
                if (is_shuffle) {
                    while (nextInd === 0)
                        nextInd = ~~(Math.random() * album.musics.length);
                }
                history.pushState({},'', `/play/${album.musics[nextInd].id}`);
                window['router']();
            })
        }, 'readonly');
    });
    const shuffleBtn = document.querySelector('.play-box > .shuffle-btn') as HTMLDivElement;
    shuffleBtn.addEventListener('click', e => {
        actionSettings('player', (settings) => {
            if (shuffleBtn.classList.contains('shuffle-btn--active'))
                settings.is_shuffle = false;
            else
                settings.is_shuffle = true;
            shuffleBtn.classList.toggle('shuffle-btn--active')
        }, 'readwrite');
    });

}

export default AlbumAux;