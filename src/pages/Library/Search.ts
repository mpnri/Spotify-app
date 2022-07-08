import { TabType } from "../../types";
import search from '../../assets/icons/search.svg';

const Search = (currentTab: TabType = 'albums') => `
    <div class="library-search">
        <div class="search-box">
            <div class="search-bar">
                <input type="text" placeholder="Find in ${currentTab}" class="search-bar__input">
                <img src="${search}" alt="search" class="search-bar__icon">
            </div>
            <div class="search-filters">Filters</div>
        </div>
    </div>
`;

export default Search;