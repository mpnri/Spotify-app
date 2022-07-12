import {DataType} from '../../types';

const LandingListLg = (data: DataType[]) => {
    return (''
        + '<div class="landing-list">'
            + `<div class="list-title">
                <h2>Made for You</h2>
               </div>`
            + '<div class="list-items">'
            + data.sort((a, b) => 0.5 - Math.random()).map(({ id, album }) => (`
                    <a href="/library/album/${id}">
                        <div class="list-item-lg">
                            <img src="${album.blob_thumb ? URL.createObjectURL(album.blob_thumb) : album.album_thumb}" alt="${album.album_name}" class="item-img">
                        </div>
                    </a>
                `)).join('')
            + '</div>'
        + '</div>'
    )
}

export default LandingListLg;