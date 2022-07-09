import Aux from '../../components/Aux';
import Albums from './Albums';
import Artists from './Artists';
import Playlists from './PlayLists';

const Library = (currentTab: 'albums' | 'artists' | 'playlists' = 'albums') => {

    switch (currentTab) {
        case 'albums':
            return Aux(Albums);
        case 'artists':
            return Aux(Artists);
        case 'playlists':
            return Aux(Playlists);
        default:
            return (() => `<h1>404 Not found</h1>`);
    }

}

export default Library;