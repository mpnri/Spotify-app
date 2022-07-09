import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';

import Profile from "./Profile";
import { DataType } from "../../../types";

const Album = (item : DataType) => {
    return (''
        + '<div class="fade album-fade"></div>'
        + `<div class="back-icon"><img src="${back}" alt="back"></div>`
        + Profile(item)
        + Menu('search')
    );
};

const AlbumAux = ({ id }: { id: string }) => {
    return new Promise<string>((resolve, reject) => {
        const database = indexedDB.open('data', 1);
        database.addEventListener('success', e => {
            const db = database.result;
            const transaction = db.transaction('albums', "readonly");
            const store = transaction.objectStore('albums');
            const album = store.get(id);
            album.addEventListener('success', e => {
                resolve(Album(album.result))
            })
        });
    })
}

export default AlbumAux;