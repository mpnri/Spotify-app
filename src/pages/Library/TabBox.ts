import { TabType } from "../../types";

const TabBox = (currentTab : TabType) => `
    <div class="tab tab-sm">
        <a href="/library/playlists"><div class="tab__item${currentTab === "playlists" ? ' tab__item--active':''}">Playlists</div></a>
        <a href="/library/artists"><div class="tab__item${currentTab === "artists" ? ' tab__item--active':''}">Artists</div></a>
        <a href="/library/albums"><div class="tab__item${currentTab === "albums" ? ' tab__item--active':''}">Albums</div></a>
    </div>
`;

export default TabBox;