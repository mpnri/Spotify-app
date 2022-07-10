import Menu from "../../components/Menu";
import back from '../../assets/icons/back.svg';
import more from '../../assets/icons/more.svg';
import like from '../../assets/icons/like.svg';
import liked from '../../assets/icons/liked.svg';

import { AlbumType, DataType, MusicType } from "../../types";
import Player from "./Player";
import { modifyMusic } from "../../handlers";

const Play = (item: DataType, id: string, settings) => {
    const musicList = item.musics;
    const musicInd = musicList.findIndex((item: MusicType) => +item.id === +id);
    const music = musicList[musicInd] as any;
    const prevMusic = musicList[(musicInd - 1 + musicList.length) % musicList.length] as any;
    const nextMusic = musicList[(musicInd + 1) % musicList.length] as any;
    return (`
        <div class="head-bar">
            <img class="back-icon" src="${back}" alt="back">
            <div class="title">Liked Songs</div>
            <img src="${more}" alt="more" class="item-more">
        </div>
        ${Player(music, prevMusic, nextMusic, settings)}
        ${Menu('library')}
    `);
};

const PlayAux = ({ id }: { id: string }) => {
    return new Promise<string>((resolve, reject) => {
        const database = indexedDB.open('data', 1);
        database.addEventListener('success', e => {
            const db = database.result;
            const transaction = db.transaction(['albums', 'settings'], "readonly");
            const store = transaction.objectStore('albums');
            const albums = store.getAll();
            albums.addEventListener('success', e => {
                const store = transaction.objectStore('settings');
                const playerSettings = store.get('player');
                playerSettings.addEventListener('success', e => {
                    resolve(
                        Play(albums.result.find(item =>item.musics.find(elm => +elm.id === +id)), id, playerSettings.result)
                    );
                })
                
            })
        });
    })
}


export const playLogic = ({id} : {id:string}) => {
    const player = document.getElementById('player') as HTMLAudioElement;
    const playerRange = document.getElementById('player-range') as HTMLInputElement;
    const timePassed = document.querySelector('.time-passed') as HTMLDivElement;
    const timeLeft = document.querySelector('.time-left') as HTMLDivElement;
    const playBtn = document.querySelector('.play-button') as HTMLDivElement;
    let timer = -1;
    const handleRange = () => {
        //* console.log(player.currentTime);
        
        const currTime = (player.currentTime || 0);
        const seekPosition = currTime * (100 / player.duration);
        const time = Math.trunc(currTime);
        //console.log(seekPosition);
        
        playerRange.value = (seekPosition || 0).toString();
        playerRange.style.backgroundSize = playerRange.value + '% 100%';
        //console.log(time, time/60, (time/60).toFixed(0));
        

        timePassed.textContent = ~~(time / 60) + ':' + (time % 60 > 9 ? '' : '0') + time % 60;
        const left = Math.floor((player.duration || 0) - time);
        timeLeft.textContent = ~~(left / 60) + ':' + (left % 60 > 9 ? '' : '0') + left % 60;


        if (player.currentTime === player.duration) {
            console.log('test');

            playBtn.dispatchEvent(new Event('click'));
            // const time = ~~player.duration;
            // timePassed.textContent = ~~(time / 60) + ':' + (time % 60 > 9 ? '' : '0') + time % 60;
            
            // console.log(timer);

            // clearInterval(timer);
            // player.pause();
            //playBtn.classList.toggle('play-button--active');

        }
    }
    handleRange();
    player.addEventListener('loadedmetadata', e => {
        //if (timer !== -10)return;
        playerRange.addEventListener('input', e => {
            playerRange.style.backgroundSize = playerRange.value + '% 100%';
            player.currentTime = player.duration * (+playerRange.value / 100);
            handleRange();
        })
        
            player.play();
            timer = setInterval(handleRange, 100);
        console.log(timer);

        playBtn.addEventListener('click', e => {
            console.log(timer, playBtn.classList.contains('play-button--active'));

            if (playBtn.classList.contains('play-button--active')) {
                player.pause();
                clearInterval(timer);
                timer = -1;
            } else {
                timer = setInterval(handleRange, 100);
                player.play();
            }
            playBtn.classList.toggle('play-button--active');
        });
        window.addEventListener('popstate', e => {
            //! clear load method?
            clearInterval(timer);
            player.pause();
            player.src = '';
        })
    })



    //* other options
    

    const likeBtn = document.querySelector('.player .item-like') as HTMLImageElement;
    likeBtn.addEventListener('click', e => {
        modifyMusic(id, (music : MusicType) => {
            music.is_liked = !music.is_liked;
            likeBtn.src = music.is_liked ? liked : like;
        })
    });

    modifyMusic(id, (music : MusicType) => {
        music.is_played = true;
    });

}

export default PlayAux;