import Menu from "../../components/Menu";
import Toolbar from "./Toolbar";

import LandingListLg from "./Landing-list-lg";
import { DataType } from "../../types";
import Aux from "../../components/Aux";


const Fade = () => `<div class="fade home-fade"></div>`;

const Home = (data : DataType[]) => {
    return (''
        + Fade()
        + '<div class="home">'
            + Toolbar()
        + '</div>'
        + '<div class="landing-lists">'
            + LandingListLg(data)
        
            + LandingListLg(data)
        
            + LandingListLg(data)
        + '</div>'
        + Menu('home')
    );
}


export default Aux(Home);