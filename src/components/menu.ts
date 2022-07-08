import home from '../assets/icons/home.svg';
import search from '../assets/icons/search.svg';
import library from '../assets/icons/library.svg';

const Menu = (activeLink: string) => {
    return `
    <div class="menu-placeholder"></div>
    <div class="menu">
        <div class="menu__item${activeLink === 'home' ? '  menu__item--active' : ''}">
            <a href="/" class="menu__link">
                <img src="${home}" alt="home" class="item__icon">
                <div class="menu__item__title">Home</div>
            </a>
        </div>
        <div class="menu__item${activeLink === 'search' ? '  menu__item--active' : ''}">
            <a href="/search" class="menu__link">
                <img src="${search}" alt="search" class="item__icon">
                <div class="menu__item__title">Search</div>
            </a>
        </div>
        <div class="menu__item${activeLink === 'library' ? '  menu__item--active' : ''}">
            <a href="/library/albums" class="menu__link">
                <img src="${library}" alt="library" class="item__icon">
                <div class="menu__item__title">Your Library</div>
            </a>
        </div>
    </div>
    `;
}

export default Menu;