import Menu from "../../components/Menu";
import Toolbar from "./Toolbar";

import LandingListLg from "./Landing-list-lg";
import { DataType } from "../../types";
import Aux from "../../components/AuxElm";
import LandingList from "./Landing-list";

import c1 from '../../assets/images/Dance & EDM.png';
import c2 from '../../assets/images/Indie.png';
import c3 from '../../assets/images/Electronic.png';
import c4 from '../../assets/images/Country Rocks.png';
import c5 from '../../assets/images/Country Rocks.png';
import c6 from '../../assets/images/Are & Be.png';

const Categories = () => `
    <div class="categories">
        <div class="list-title">
            <h2>Good afternoon</h2>
        </div>
        <div class="categories__list">
            <div class="category">
                <img src="${c1}" alt="category" class="category__img">
                <div class="category__title">Dance & EDM</div>
            </div>
            <div class="category">
                <img src="${c2}" alt="category" class="category__img">
                <div class="category__title">Indie</div>
            </div>
            <div class="category">
                <img src="${c3}" alt="category" class="category__img">
                <div class="category__title">Electronic</div>
            </div>
            <div class="category">
                <img src="${c4}" alt="category" class="category__img">
                <div class="category__title">Country Rocks</div>
            </div>
            <div class="category">
                <img src="${c5}" alt="category" class="category__img">
                <div class="category__title">Chilled Hits</div>
            </div>
            <div class="category">
                <img src="${c6}" alt="category" class="category__img">
                <div class="category__title">Are & Be</div>
            </div>
        </div>
    </div>
`;

const Fade = () => `<div class="fade home-fade"></div>`;

const Home = (data : DataType[]) => {
    return (''
        + Fade()
        + '<div class="home">'
            + Toolbar()
            + Categories()
        + '</div>'
        + '<div class="landing-lists">'
            + LandingListLg(data)
        
            + LandingList(data)
        
            + ''//LandingListLg(data)
        + '</div>'
        + Menu('home')
    );
}


export default Aux(Home);