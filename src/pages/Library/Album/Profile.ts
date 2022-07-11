import { AlbumType, DataType, MusicType } from "../../../types";

import like from '../../../assets/icons/like.svg';
import liked from '../../../assets/icons/liked.svg';
import download from '../../../assets/icons/download.svg';
import more from '../../../assets/icons/more.svg';
import play from '../../../assets/icons/play.svg';
import shuffle from '../../../assets/icons/shuffle.svg';

const ProfileListItem = (music: MusicType) => `
    <div class="list-item">
        <a href="/play/${music.id}">
            <div class="item-container">
                <div class="item-info">
                    <div class="item-name">${music.track_name}</div>
                    <div class="item-tag">
                        <img class="item-tag__icon" src="${download}" alt="download">
                        <div class="item-tag__data">Track: ${music.track_time}</div>
                    </div>
                </div>
            </div>
        </a>
        <img src="${more}" alt="more" class="item-more">
    </div>
`;

const ProfileList = (musics : MusicType[]) => `
    <div class="profile-list">
        <div class="list-items">
           ${
            musics.map(music => ProfileListItem(music)).join('')
           }
        </div>
    </div>
`;

const ProfileCard = (item : DataType, {is_shuffle}) => `
    <div class="profile-card">
        <div class="profile-box">
            <div class="profile-info">
                <div class="profile-title">${item.album.album_name}</div>
                <div class="profile-artist">
                    <img src="${item.album.blob_thumb || item.album.album_thumb}" class="artist-img"></img>
                    <div class="artist-title">${item.album.album_composer}</div>
                </div>
                <div class="profile-date">
                    Album<span class="dot"></span>${item.album.album_genre}
                </div>
            </div>
            <div class="profile-toolbar">
                <img src="${item.musics.every(elm => elm.is_liked) ? liked:like}" alt="like" class="profile-like"/>
                <img src="${download}" alt="download" class="profile-download"/>
                <img src="${more}" alt="more" class="profile-more"/>
            </div>
        </div>
        <div class="play-container">
            <div class="play-box">
                <div class="play-btn">
                    <img src="${play}" alt="play">
                </div>
                <div class="shuffle-btn${is_shuffle ? ' shuffle-btn--active':''}">
                    <img src="${shuffle}" alt="shuffle">
                </div>
            </div>
        </div>
    </div>
`;

const Profile = (item : DataType, settings) => `
    <div class="profile">
        <div class="profile__img">
            <img src="${item.album.blob_thumb || item.album.album_thumb} " alt="Presence">
        </div>
        ${ProfileCard(item, settings)}
        ${ProfileList(item.musics)}
    </div>
`;

export default Profile;