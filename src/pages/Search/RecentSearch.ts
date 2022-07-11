
import {AlbumType, DataType, MusicType} from '../../types';
import close from '../../assets/icons/close.svg';

const RecentSearch = (data : (AlbumType | MusicType)[]) => {
    console.log(!!data.length + '------------');
    
    return (''
        + '<div class="search-list">'
+ (data.length ? `<div class="list-title">
                    <h2>Recent searches</h2>
                </div>
                <div class="list-items recent-list">
                    ${data.sort((a,b) => +b.is_searched - +a.is_searched)
                        .slice(0,2).map((elm) => {
                            let img, name, tag;
                            if (elm.hasOwnProperty('album_name')) {
                                elm = elm as AlbumType;
                                img = elm.blob_thumb || elm.album_thumb;
                                name = elm.album_name;
                                tag = elm.album_composer;
                            } else {
                                elm = elm as MusicType;
                                img = elm.blob_thumb || elm.track_thumb;
                                name = elm.track_name;
                                tag = 'Track: ' + elm.track_time;
                            }
                            return (`
                                <div class="list-item">
                                    <a href="${(elm.hasOwnProperty('album_name') ? '/library/album/':'/play/')+elm.id}">
                                        <div class="item-container">
                                            <img src="${img}" alt="item-img" class="item-img${elm.hasOwnProperty('album') ? '':' circle-item'}">
                                            <div class="item-info">
                                                <div class="item-name">${name}</div>
                                                <div class="item-tag">${tag}</div>
                                            </div>
                                        </div>
                                    </a>
                                    <img src="${close}" item-id="${(elm.hasOwnProperty('album_name') ? 'album/':'play/')+elm.id}" alt="close" class="item-close"></img>
                                </div>
                            `)
                        }).join('')
                    }    
                </div>`: '')
            +`<div class="list-title results-title" style="display: none">
                <h2>Search Result</h2>
              </div>
              <div class="list-items list-results">

              </div>`
        + '</div>'
    );
}

export default RecentSearch;