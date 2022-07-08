import Albums from './Albums';
import Artists from './Artists';
import Playlists from './PlayLists';

const Library = (currentTab : 'albums' | 'artists' | 'playlists' = 'albums') => {
    switch (currentTab) {
        case 'albums':
            return Albums;
        case 'artists':
            return Artists;
        case 'playlists':
            return Playlists;
        default:
            return () => `<h1>404 Not found</h1>`;
    }
}

export default Library;