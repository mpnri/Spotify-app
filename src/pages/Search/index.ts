import Menu from "../../components/Menu";
import Mic from "../../components/Mic";
import SearchBox from "./SearchBox";

import data from '../../data/data.json';
import RecentSearch from "./RecentSearch";

const Search = () => {
    return (''
        + SearchBox()
        + '<div class="search-lists">'
            + RecentSearch(data as any)
        + '</div>'
        + Menu('search')
        + Mic()
    );
}

export default Search;