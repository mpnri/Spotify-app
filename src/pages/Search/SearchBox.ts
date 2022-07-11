import search from '../../assets/icons/search.svg';
import camera from '../../assets/icons/camera.svg';

const SearchBox = () => {
    return (''
        + `<div class="search">
            <div class="search-box">
                <div class="search-bar">
                    <input type="text" placeholder="Search" id="search" class="search-bar__input">
                    <img src="${search}" alt="search" class="search-bar__icon">
                </div>
                <div class="search-box__cancel">Cancel</div>
                <div class="search-box__camera">
                    <img src="${camera}" alt="camera">
                </div>
            </div>
        </div>
        `
    );
}

export default SearchBox;