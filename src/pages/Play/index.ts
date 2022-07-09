import Menu from "../../components/Menu";
import back from '../../assets/icons/back.svg';
import more from '../../assets/icons/more.svg';

import data from '../../data/data.json';
import { DataType, MusicType } from "../../types";
import Player from "./Player";

const Play = ({ id }: { id: number }) => {

    const music = data.reduce((prev, elm: any) => {
        const curr = [...prev, ...elm.musics]
        return curr;
    }, [] as MusicType[]).find(elm => +elm.id === +id) as MusicType;

    return (`
        <div class="head-bar">
            <img class="back-icon" src="${back}" alt="back">
            <div class="title">Liked Songs</div>
            <img src="${more}" alt="more" class="item-more">
        </div>
        ${Player(music)}
        ${Menu('library')}
    `);
};

export const playLogic = () => {
    const player = document.getElementById('player') as HTMLAudioElement;
    const playerRange = document.getElementById('player-range') as HTMLInputElement;
    const timePassed = document.querySelector('.time-passed') as HTMLDivElement;
    const timeLeft = document.querySelector('.time-left') as HTMLDivElement;
    const playBtn = document.querySelector('.play-button') as HTMLDivElement;
    let timer = -1;
    const handleRange = () => {
        console.log(player.currentTime);
        
        const time = +(player.currentTime || 0).toFixed(0);
        const seekPosition = time * (100 / player.duration);
        
        playerRange.value = (seekPosition || 0) + '';
        playerRange.style.backgroundSize = playerRange.value + '% 100%';
        
        
        timePassed.textContent = (time/60).toFixed(0) + ':' + (time%60>9 ? '':'0')+time%60;
        const left = +( (player.duration || 0) - time).toFixed(0)
        timeLeft.textContent = (left/60).toFixed(0) + ':' + (left%60>9 ? '':'0')+left%60;
        //console.log(time , player.duration || 0);
        

        if (player.currentTime === player.duration) {
            console.log('test');
            
            playBtn.dispatchEvent(new Event('click'));
            // console.log(timer);
            
            // clearInterval(timer);
            // player.pause();
            //playBtn.classList.toggle('play-button--active');
            
        }
    }
    handleRange();
    player.addEventListener('loadedmetadata', e => {
        playerRange.addEventListener('input', e => {
            playerRange.style.backgroundSize = playerRange.value + '% 100%';
            player.currentTime = player.duration * (+playerRange.value / 100);
            handleRange();
        })
        
        
        
        player.play();
        
        //if (timer < 0)
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
        window.addEventListener('popstate', e=> {
            clearInterval(timer);
        })
    })
    
}

export default Play;