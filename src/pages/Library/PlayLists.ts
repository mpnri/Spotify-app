import Menu from "../../components/menu";
import Mic from "../../components/mic";
import Search from "./Search";
import TabBox from "./TabBox";

import liked from '../../assets/icons/liked.svg';
//import data from '../../data/data.json';

const PlaylistsItem = () => `
    <a href="/library/liked-songs" style="all:unset">
        <div class="item-container">
            <img src="${liked}" alt="item-img" class="item-img circle-item">
            <div class="item-info">
                <div class="item-name">Liked Songs</div>
            </div>
        </div>
    </a>
`;

const Playlists = () => {
    return (''
        + '<div class="tabs">'
            +  `<div class="tab tab-lg">
                    <div class="tab__item tab__item--active">Music</div>
                    <div class="tab__item">Podcasts</div>
                </div>`
            + TabBox('playlists')
        + '</div>'
        + Search('playlists')
        + `<div class="playlists search-lists">
                <div class="search-list">
                    <div class="list-items">`
                        + PlaylistsItem()
        +          `</div>
                </div>
           </div>`
        + Menu('library')
        + Mic()
    );
}

export default Playlists;