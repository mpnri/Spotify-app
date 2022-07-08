import Menu from "../../../components/menu";

import back from '../../../assets/icons/back.svg';

import data from '../../../data/data.json';

import Profile from "./Profile";

const Album = ({ id }: { id: string }) => {
    const album = data.find(elm => elm.album.id === id);
    return (''
        + '<div class="fade album-fade"></div>'
        + `<div class="back-icon"><img src="${back}" alt="back"></div>`
        + Profile(album as any)
        + Menu('search')
    );
};

export default Album;