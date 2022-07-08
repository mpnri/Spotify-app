
import {DataType} from '../../types';
import close from '../../assets/icons/close.svg';

const RecentSearch = (data : DataType[]) => {
    return (''
        + '<div class="search-list">'
            + `<div class="list-title">
                <h2>Recent searches</h2>
              </div>`
            + '<div class="list-items">'
                + data.sort((a,b) => 0.5 - Math.random()).filter(elm => elm.album.album_name).slice(0,5).map(( {album}) => {
                    console.log(album); // for empty items
                    return (`
                    <div class="list-item">
                        <div class="item-container">
                            <img src="${album.album_thumb}" alt="item-img" class="item-img circle-item">
                            <div class="item-info">
                                <div class="item-name">${album.album_name}</div>
                                <div class="item-tag">${album.album_composer}</div>
                            </div>
                        </div>
                        <img src="${close}" album-id="${album.id}" alt="close" class="item-close"></img>
                    </div>
                    
                `)}).join('')
                + ``
            +  `</div>
        </div>`
    );
}

export default RecentSearch;