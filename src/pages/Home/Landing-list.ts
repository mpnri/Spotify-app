import {DataType, MusicType} from '../../types';

const LandingList = (data: DataType[]) => {
    const musics = data.reduce( (prev, item) => [...prev, ...item.musics], [] as MusicType[])
        .filter(item => item.is_played)
        .sort((a,b) => +b.is_played - +a.is_played).slice(0,10);    
    return (''
        + '<div class="landing-list">'
            + `<div class="list-title">
                <h2>Recently played</h2>
               </div>`
            + '<div class="list-items">'
            + musics.map((music) => (`
                    <a href="/play/${music.id}">
                        <div class="list-item">
                            <img src="${music.blob_thumb ? URL.createObjectURL(music.blob_thumb) : music.track_thumb}" alt="item-img" class="item-img">
                            <div class="item-title">${music.track_name}</div>
                        </div>
                    </a>
                `)).join('')
            + '</div>'
        + '</div>'
    )
}

export default LandingList;


/*

<div class="landing-list">
            <div class="list-title">
                <h2>Recently played</h2>
            </div>
            <div class="list-items">
                <div class="list-item">
                    <img src="assets/images/Study Beats.png" alt="item-img" class="item-img">
                    <div class="item-title">Study Beats</div>
                </div>
                <div class="list-item">
                    <img src="assets/images/Study Beats.png" alt="item-img" class="item-img">
                    <div class="item-title">Study Beats</div>
                </div>
                <div class="list-item">
                    <img src="assets/images/Study Beats.png" alt="item-img" class="item-img">
                    <div class="item-title">Study Beats</div>
                </div>
                <div class="list-item">
                    <img src="assets/images/Study Beats.png" alt="item-img" class="item-img">
                    <div class="item-title">Study Beats</div>
                </div>
            </div>
        </div>

 */