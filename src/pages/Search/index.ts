import Menu from "../../components/Menu";
import Mic from "../../components/Mic";
import SearchBox from "./SearchBox";

import RecentSearch from "./RecentSearch";
import Aux from "../../components/AuxElm";
import { actionAlbum, getAlbums, modifyMusic } from "../../handlers";
import { DataType, MusicType } from "../../types";

const Search = (data) => {
    const albums = data;
    const musics = albums.reduce( (prev, item) =>  [...prev, ...item.musics.filter(elm => elm.is_searched)], [] as any) as MusicType[];
    const results = [...musics, ...albums.map(elm => elm.album).filter(elm => elm.is_searched)];
    return (''
        + SearchBox()
        + '<div class="search-lists">'
            + RecentSearch(results)
        + '</div>'
        + Menu('search')
        + Mic()
    );
}

export const searchLogic = () => {
    const searchBox = document.getElementById('search') as HTMLInputElement;
    searchBox.addEventListener('input', e => {
        const text = searchBox.value;
        console.log(text);

        getAlbums( (albums : DataType[]) => {
            const musics = albums.reduce( (prev, item) =>  [...prev, ...item.musics], [] as any) as MusicType[];
            const results = [...musics.filter(elm => elm.track_name.includes(text) || false),
                             ...albums.filter(item => item.album.album_name.includes(text))];
            const resultsElm = document.querySelector('.list-results') as HTMLDivElement;
            setTimeout(() => {
                const resultsTitle = document.querySelector('.results-title') as HTMLDivElement;
                if (!text) {
                    resultsTitle.style.display = 'none';
                    return resultsElm.innerHTML = '';
                }
                resultsTitle.style.display = 'block';
                resultsElm.innerHTML = results.map( (elm : MusicType | DataType) => {
                    let img, name, tag;
                    if (elm.hasOwnProperty('album')) {
                        elm = elm as DataType;
                        img = elm.album.blob_thumb ? URL.createObjectURL(elm.album.blob_thumb) : elm.album.album_thumb;
                        name = elm.album.album_name;
                        tag = elm.album.album_composer;
                    } else {
                        elm = elm as MusicType;
                        img = elm.blob_thumb ? URL.createObjectURL(elm.blob_thumb) : elm.track_thumb;
                        name = elm.track_name;
                        tag = 'Track: ' + elm.track_time;
                    }
                    return (`
                        <div class="list-item">
                            <a href="${(elm.hasOwnProperty('album') ? '/library/album/':'/play/')+elm.id}">
                                <div class="item-container">
                                    <img src="${img}" alt="item-img" class="item-img${elm.hasOwnProperty('album') ? '':' circle-item'}">
                                    <div class="item-info">
                                        <div class="item-name">${name}</div>
                                        <div class="item-tag">${tag}</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    `)
                }).join('');
                document.querySelectorAll('.list-items a').forEach( elm => {
                    const target = elm as HTMLLinkElement;
                    target.addEventListener('click', e => {
                        const targetSrcList = target.href.split('/');
                        const targetId = targetSrcList[targetSrcList.length - 1];
                        if (target.href.includes('play')) {
                            modifyMusic(targetId, (music : MusicType) => {
                                music.is_searched = Date.now();
                            })
                        } else {
                            actionAlbum(targetId, (album : DataType) => {
                                album.album.is_searched = Date.now();
                            }, 'readwrite')
                        }
                    });
                });

            }, 500);
        });
    });
    const cancelBtn = document.querySelector('.search-box__cancel') as HTMLDivElement;
    cancelBtn.addEventListener('click', e => {
        searchBox.value = '';
        searchBox.dispatchEvent(new Event('input'));
    })

    document.querySelectorAll('.recent-list .item-close').forEach(elm => {
        const target = elm as HTMLDivElement;
        
        
        const elmIdList = target.getAttribute('item-id')!.split('/');
        const elmId = elmIdList[1];
        target.addEventListener('click', e => {
            if (elmIdList[0] === 'play') {
                modifyMusic(elmId, (music : MusicType) => {
                    music.is_searched = false;
                })
            } else {
                actionAlbum(elmId, (album : DataType) => {
                    album.album.is_searched = false;
                }, 'readwrite')
            }
            window['router']();
        });
    })
}

export default Aux(Search);