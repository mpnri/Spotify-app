import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';
import like from '../../../assets/icons/like.svg';
import liked from '../../../assets/icons/liked.svg';

import Profile from "./Profile";
import { AlbumType, DataType, MusicType } from "../../../types";
import { actionAlbum, actionSettings, getAlbums, modifyMusic } from "../../../handlers";

const Album = (item : DataType, settings) => {
    console.log(item);
    
    return (''
        + '<div class="fade album-fade"></div>'
        + `<div class="back-icon real-back"><img src="${back}" alt="back"></div>`
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

    document.querySelector('.real-back')?.addEventListener('click', e => {
        history.pushState({},'', '/library/albums');
        window['router']();
    })
    actionAlbum(id, (res : DataType) => {
        // const blobImg = new Image();
        // blobImg.crossOrigin = "Anonymous";
        // blobImg.addEventListener('load', e => {
        //     let canvas = document.createElement('canvas');
        //     canvas.width = blobImg.clientWidth;
        //     canvas.height = blobImg.clientHeight;

        //     let context = canvas.getContext('2d')!;

        //     // copy image to it (this method allows to cut image)
        //     context.drawImage(blobImg, 0, 0);
        //     canvas.toBlob((blob) => {
        //         console.log(URL.createObjectURL(blob!));
                
        //     })
        // })
        // blobImg.src = res.album.album_thumb.replace('https', 'http');

        //! download img and convert to blob
        // fetch(res.album.album_thumb, {
        //     //mode: 'no-cors'
        // })
        //     //.then(res => res.blob())
        //     .then(res => {
        //         console.log(res.ok);
        //         return res.blob();
        //     })
        //     .then(data => {
        //         URL.revokeObjectURL(res.album.blob_thumb)
        //         actionAlbum(id, (newRes : DataType) => {
        //             console.log(data);
                    
        //             newRes.album.blob_thumb = URL.createObjectURL(data);
        //             //res.album.is_searched = true;
                    
        //             console.log(newRes.album.blob_thumb);
        //         }, 'readwrite')
                
        //     })
    }, 'readonly')
}

export default AlbumAux;