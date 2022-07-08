import Menu from "../../../components/menu";

import back from '../../../assets/icons/back.svg';
import Profile from "./Profile";

import data from '../../../data/data.json';

const LikedSongs = () => `
    <div class="fade liked-fade"></div>
    <div class="back-icon"><img src="${back}" alt="back"></div>
    ${Profile(data as any)}
    ${Menu('library')}
`;

export default LikedSongs;