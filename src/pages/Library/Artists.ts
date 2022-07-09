import Menu from "../../components/Menu";
import Mic from "../../components/Mic";
import { AlbumType, DataType } from "../../types";
import Search from "./Search";
import TabBox from "./TabBox";


const ArtistsItem = (album : AlbumType) => `
    <!--<a href="./albums/${album.id}/" style="all:unset">-->
        <div class="list-item">
            <div class="item-container">
                <img src="${album.album_thumb}" alt="item-img" class="item-img circle-item">
                <div class="item-info">
                    <div class="item-name">${album.album_composer}</div>
                </div>
            </div>
        </div>
    <!--</a>-->
`;

const Artists = (data : DataType[]) => {
    return (''
        + '<div class="tabs">'
            +  `<div class="tab tab-lg">
                    <div class="tab__item tab__item--active">Music</div>
                    <div class="tab__item">Podcasts</div>
                </div>`
            + TabBox('artists')
        + '</div>'
        + Search('artists')
        + `<div class="artists search-lists">
                <div class="search-list">
                    <div class="list-items">`
                        + data.filter(elm => elm.album.album_name).reverse().map( ({album}) => ArtistsItem(album)).join('')
        +          `</div>
                </div>
           </div>`
        + Menu('library')
        + Mic()
    );
}

export default Artists;