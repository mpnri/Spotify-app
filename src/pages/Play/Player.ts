import { MusicType } from "../../types";
import like from '../../assets/icons/like.svg';
import liked from '../../assets/icons/liked.svg';
import devices from '../../assets/icons/devices.svg';
import queue from '../../assets/icons/queue.svg';
import shuffle from '../../assets/icons/shuffle.svg';
import leftBtn from '../../assets/icons/left-btn.svg';
import rightBtn from '../../assets/icons/right-btn.svg';
import stop from '../../assets/icons/stop.svg';
import play from '../../assets/icons/play.svg';
import repeat from '../../assets/icons/repeat.svg';


const Profile = (music : MusicType) => `
    <div class="profile">
        <img src="${music.blob_thumb ? URL.createObjectURL(music.blob_thumb) : music.track_thumb}" alt="profile-img" class="profile-img">
        <div class="item-container">
            <div class="item-info">
                <div class="item-name">${music.track_name}</div>
                <div class="item-tag">
                    <div class="item-tag__data">Track: ${music.track_time}</div>
                </div>
            </div>
            <div class="toolbar">
                <img src="${music.is_liked ? liked:like}" alt="like" class="item-like">
            </div>
        </div>
    </div>
`;


const PlayerControls = (music : MusicType, prevMusic : number, nextMusic : number, settings : {is_repeat: boolean;is_shuffle: boolean;}) => `
    <div class="player__controls">
        <div class="range">
            <input id="player-range" type="range" style="background-size: 0% 100%;" value="0" min="0" max="100" class="range-bar" />
            <div class="times">
                <div class="time-passed">0:03</div>
                <div class="time-left">-3:49</div>
            </div>
        </div>
        <audio id="player">
            <source src="${music.blob_url ? URL.createObjectURL(music.blob_url) : music.track_url}" type="audio/mp3">
        </audio>
        <div class="controls">
            <div class="option-btn${settings.is_shuffle ? ' option-btn--active':''}" id="shuffle">
                <img class="option-btn-icon" src="${shuffle}" alt="shuffle">
                <div class="dot"></div>
            </div>
            <a href="/play/${prevMusic}">
                <div class="left-btn">
                    <img src="${leftBtn}" alt="left button">
                </div>
            </a>
            <div class="play-button play-button--active">
                <img src="${stop}" alt="stop">
                <img src="${play}" alt="play">
            </div>
            <a href="/play/${nextMusic}">
                <div class="right-btn">
                    <img src="${rightBtn}" alt="right button">
                </div>
            </a>
            <div class="option-btn${settings.is_repeat ? ' option-btn--active':''}" id="repeat">
                <img class="option-btn-icon" src="${repeat}" alt="repeat">
                <div class="dot"></div>
            </div>
        </div>
        <div class="footer-controls">
            <img src="${devices}" alt="devices">
            <img src="${queue}" alt="queue">
        </div>
    </div>
`;

const Player = (music : MusicType, prevMusic : number, nextMusic : number, settings) => `
    <div class="player">
        ${Profile(music)}
        ${PlayerControls(music, prevMusic, nextMusic, settings)}
    </div>
`;

export default Player;