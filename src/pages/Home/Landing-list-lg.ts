import {DataType} from '../../types';

const LandingListLg = (data: DataType[]) => {
    return (''
        + '<div class="landing-list">'
            + `<div class="list-title">
                <h2>Made for You</h2>
               </div>`
            + '<div class="list-items">'
            + data.sort((a, b) => 0.5 - Math.random()).map(({ id, musics }) => (`
                    <a href="/library/album/${id}">
                        <div class="list-item-lg">
                            <img src="${musics[0].blob_thumb || musics[0].track_thumb}" alt="${musics[0].track_name}" class="item-img">
                        </div>
                    </a>
                `)).join('')
            + '</div>'
        + '</div>'
    )
}

export default LandingListLg;