import { DataType, MusicType } from "../../../types";

import download from '../../../assets/icons/download.svg';
import downloaded from '../../../assets/icons/downloaded.svg';
import more from '../../../assets/icons/more.svg';
import liked from '../../../assets/icons/liked.svg';

const ProfileListItem = (music : MusicType) => `
    <div class="list-item">
        <a href="/play/${music.id}">
            <div class="item-container">
                <img src="${music.track_thumb}" alt="item-img" class="item-img">
                <div class="item-info">
                    <div class="item-name">${music.track_name}</div>
                    <div class="item-tag">
                        <img class="item-tag__icon" src="${downloaded}" alt="download">
                        <div class="item-tag__data">Track <div class="dot"></div>${music.track_time}</div>
                    </div>
                </div>
            </div>
        </a>
        <div class="item-toolbar">
            <img src="${liked}" alt="like" class="item-like">
            <img src="${more}" alt="more" class="item-more">
        </div>
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

const Profile = (data: DataType[]) => {
    const likedList = data.reduce((prev, elm)=>{
        const curr = [...prev, ...elm.musics.filter(elm => elm.is_liked)]
        return curr;
    }, [] as MusicType[]);
    return (`
        <div class="profile liked">
            <div class="profile-card">
                <div class="profile__title">Liked Songs</div>
                <div class="profile__play">Shuffle PLay</div>
                <div class="profile__add-item">Add Songs</div>
            </div>
            <div class="profile__toolbar">
                <div class="toolbar__item">
                    <div class="item__name">Downloading...</div>
                    <div class="item__checkbox">
                        <div class="checkbox checkbox--active">
                            <div class="check"></div>
                        </div>
                    </div>
                </div>
            </div>
            ${ProfileList(likedList)}
        </div>
    `);
}

export default Profile;