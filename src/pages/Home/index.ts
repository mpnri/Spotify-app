import Menu from "../../components/Menu";
import Toolbar from "./Toolbar";

import data from '../../data/data.json';
import LandingListLg from "./Landing-list-lg";

const Fade = () => `<div class="fade home-fade"></div>`;

const Home = () => {
    return (''
        + Fade()
        + '<div class="home">'
            + Toolbar()
        + '</div>'
        + '<div class="landing-lists">'
            + LandingListLg(data as any)
        
            + LandingListLg(data as any)
        
            + LandingListLg(data as any)
        + '</div>'
        + Menu('home')
    );
}

export default Home;