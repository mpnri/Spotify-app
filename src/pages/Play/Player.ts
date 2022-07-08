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
        <img src="${music.track_thumb}" alt="profile-img" class="profile-img">
        <div class="item-container">
            <div class="item-info">
                <div class="item-name">${music.track_name}</div>
                <div class="item-tag">
                    <div class="item-tag__data">Track: ${music.track_time}</div>
                </div>
            </div>
            <div class="toolbar">
                <img src="${like}" alt="like" class="item-like">
            </div>
        </div>
    </div>
`;


const PlayerControls = (music : MusicType) => `
    <div class="player__controls">
        <div class="range">
            <input id="player-range" type="range" style="background-size: 25% 100%;" value="25" min="1" max="100" class="range-bar" />
            <div class="times">
                <div class="time-passed">0:03</div>
                <div class="time-left">-3:49</div>
            </div>
        </div>
        <div class="controls">
            <div class="option-btn option-btn--active">
                <img class="option-btn-icon" src="${shuffle}" alt="shuffle">
                <div class="dot"></div>
            </div>
            <div class="left-btn">
                <img src="${leftBtn}" alt="left button">
            </div>
            <div class="play-button play-button--active">
                <img src="${stop}" alt="stop">
                <img src="${play}" alt="play">
            </div>
            <div class="right-btn">
                <img src="${rightBtn}" alt="right button">
            </div>
            <div class="option-btn">
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

const Player = (music : MusicType) => `
    <div class="player">
        ${Profile(music)}
        ${PlayerControls(music)}
    </div>
`;

export default Player;