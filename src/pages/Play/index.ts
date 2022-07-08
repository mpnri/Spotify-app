import Menu from "../../components/menu";
import back from '../../assets/icons/back.svg';
import more from '../../assets/icons/more.svg';

import data from '../../data/data.json';
import { DataType, MusicType } from "../../types";
import Player from "./Player";

const Play = ({ id }: { id: number }) => {

    const music = data.reduce((prev, elm: any) => {
        const curr = [...prev, ...elm.musics]
        return curr;
    }, [] as MusicType[]).find(elm => +elm.id === +id) as MusicType;

    return (`
        <div class="head-bar">
            <img class="back-icon" src="${back}" alt="back">
            <div class="title">Liked Songs</div>
            <img src="${more}" alt="more" class="item-more">
        </div>
        ${Player(music)}
        ${Menu('library')}
    `);
};

export default Play;