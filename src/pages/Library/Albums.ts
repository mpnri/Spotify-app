import Menu from "../../components/Menu";
import Mic from "../../components/Mic";
import { AlbumType, DataType } from "../../types";
import Search from "./Search";
import TabBox from "./TabBox";

const AlbumsItem = (album : AlbumType) => `
    <a href="./album/${album.id}/" style="all:unset">
        <div class="list-item">
            <div class="item-container">
                <img src="${album.blob_thumb || album.album_thumb}" alt="item-img" class="item-img">
                <div class="item-info">
                    <div class="item-name">${album.album_name}</div>
                    <div class="item-tag">${album.album_composer}</div>
                </div>
            </div>
        </div>
    </a>
`;

const Albums = (data : DataType[]) => {
    return (''
        + '<div class="tabs">'
            +  `<div class="tab tab-lg">
                    <div class="tab__item tab__item--active">Music</div>
                    <div class="tab__item">Podcasts</div>
                </div>`
            + TabBox('albums')
        + '</div>'
        + Search('albums')
        + `<div class="albums search-lists">
                <div class="search-list">
                    <div class="list-items">`
                        + data.filter(elm => elm.album.album_name).map( ({album}) => AlbumsItem(album)).join('')
        +          `</div>
                </div>
           </div>`
        + Menu('library')
        + Mic()
    );
}

export default Albums;