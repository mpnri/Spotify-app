import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';
import Profile from "./Profile";

import { DataType, MusicType } from "../../../types";
import Aux from "../../../components/AuxElm";
import { getAlbums, modifyMusic } from "../../../handlers";


const LikedSongs = (data : DataType[]) => `
    <div class="fade liked-fade"></div>
    <div class="back-icon liked"><img src="${back}" alt="back"></div>
    ${Profile(data)}
    ${Menu('library')}
`;

export const likedSongsLogic = () => {
    const backBtn = document.querySelector('.back-icon.liked') as HTMLDivElement;
    backBtn.addEventListener('click', e => {
        history.pushState({},'', '/library/playlists');
        window['router']();
    });
    
    document.querySelectorAll('.item-toolbar .item-like').forEach( (elm) => elm.addEventListener('click', e => {
        const target = elm as HTMLImageElement;
        const id = target.getAttribute('data-id')!;
        modifyMusic(id, (music : MusicType) => {
            music.is_liked = false;
            window['router']();
        })
    }))

    const shufflePlay = document.querySelector('.profile__play') as HTMLDivElement;
    shufflePlay.addEventListener('click', e => {
        getAlbums( (data : DataType[]) => {
            const musics = data.reduce((prev, {musics}) => [...prev, ...musics], [] as MusicType[]);
            const likedList = musics.filter(music => music.is_liked);
            const randId = ~~(Math.random() * likedList.length);
            history.pushState({}, '', '/play/' + likedList[randId].id);
            window['router']();
        });
    });

    const itemName = document.querySelector('.toolbar__item .item__name') as HTMLDivElement;
    const itemCheckbox = document.querySelector('.item__checkbox') as HTMLDivElement;
    const checkbox = document.querySelector('.item__checkbox .checkbox') as HTMLDivElement;
    itemCheckbox.addEventListener('click' , e => {
        checkbox.classList.toggle('checkbox--active');
        if (checkbox.classList.contains('checkbox--active')) {
            itemName.textContent = 'Downloading...';
            
            getAlbums((data: DataType[]) => {
                const musics = data.reduce((prev, { musics }) => [...prev, ...musics], [] as MusicType[]);
                const likedList = musics.filter(music => music.is_liked);
                const downloadMusicList = (ind = 0) => {
                    if (ind === likedList.length) {
                        itemCheckbox.dispatchEvent(new Event('click'));
                        itemName.textContent = 'Download Finished!';
                        return;
                    }
                    if (likedList[ind].is_downloaded) {
                        fetch(likedList[ind].track_url)
                            .then(res => res.ok ? res.blob() : (() => { throw new Error(res.statusText) })())
                            .then(data => {
                                modifyMusic(likedList[ind].id + '', (music: MusicType) => {
                                    music.blob_url = data;
                                    downloadMusicList(ind + 1);
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    } else {
                        downloadMusicList(ind + 1);
                    }
                };
                downloadMusicList();
            });

        } else {
            itemName.textContent = 'Download';
        }
    })

    const addSongBtn = document.querySelector('.profile__add-item') as HTMLDivElement;
    addSongBtn.addEventListener('click', e => {
        history.pushState({}, '', '/library/albums');
        window['router']();
    })
}

export default Aux(LikedSongs);