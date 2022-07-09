import Menu from "../../../components/Menu";

import back from '../../../assets/icons/back.svg';
import Profile from "./Profile";

import { DataType } from "../../../types";
import Aux from "../../../components/Aux";


const LikedSongs = (data : DataType[]) => `
    <div class="fade liked-fade"></div>
    <div class="back-icon"><img src="${back}" alt="back"></div>
    ${Profile(data)}
    ${Menu('library')}
`;

export default Aux(LikedSongs);