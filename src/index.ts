import Library from "./pages/Library/";
import Home from "./pages/Home";
import Search, { searchLogic } from "./pages/Search";
import Album, { albumLogic } from "./pages/Library/Album";
import LikedSongs, { likedSongsLogic } from "./pages/Library/LikedSongs";
import Play, {playLogic} from "./pages/Play";

import data from './data/data.json';


const database = indexedDB.open('data',1);

database.addEventListener('upgradeneeded', e => {
    const db = database.result;
    switch(e.oldVersion) {
        case 0:
            const store = db.createObjectStore('albums', {
                keyPath: 'id'
            });
            data.filter(elm => elm.album.album_name).forEach(item => {
                item.musics.forEach(elm => {
                    elm.is_liked = false;
                    elm.is_searched = false;
                    elm.is_downloaded = false;
                    elm.is_played = false;
                    elm.blob_thumb = null;
                    elm.blob_url = null;
                })
                item.album['is_searched'] = false;
                item['id'] = item.album.id;
                item.album['blob_thumb'] = null
                store.add(item);
            });
            const storeSettings = db.createObjectStore('settings', {
                keyPath: 'name'
            });
            storeSettings.add({
                name: 'player',
                is_repeat: false,
                is_shuffle: false,
            })
            console.log('build database successful');
    }

    
    processRoutes();
    handleRouteChange();
})

database.onsuccess = () => {
    // const db = database.result;
    // const transaction = db.transaction( ['albums', 'settings'], "readwrite");
    // const store = transaction.objectStore('albums');
    // store.clear();
    // const storeSettings = transaction.objectStore('settings');
    // storeSettings.clear();

    // data.filter(elm => elm.album.album_name).forEach(item => {
    //     item.musics.forEach(elm => {
    //         elm.is_liked = false;
    //         elm.is_searched = false;
    //         elm.is_downloaded = false;
    //         elm.is_played = false;
    //         elm.blob_thumb = null;
    //         elm.blob_url = null;
    //     })
    //     item.album['is_searched'] = false;
    //     item['id'] = item.album.id;
    //     item.album['blob_thumb'] = null
    //     store.add(item);
    // });
    // storeSettings.add({
    //     name: 'player',
    //     is_repeat: false,
    //     is_shuffle: false,
    // })
    console.log('access database successful');
    processRoutes();
    handleRouteChange();
}



const App = document.getElementById('app')!;
const routes = {
    '/': {run: Home, logic: ()=>{}},
    '/search': {run: Search, logic: searchLogic},
    '/library': {run: Library('albums'), logic: ()=>{}},
    '/library/albums': {run: Library('albums'), logic: ()=>{}},
    '/library/artists': {run: Library('artists'), logic: ()=>{}},
    '/library/playlists': {run: Library('playlists'), logic: ()=>{}},
    '/library/album/:id': {run: Album, logic: albumLogic},
    '/library/liked-songs': {run: LikedSongs, logic: likedSongsLogic},
    '/play/:id': {run: Play, logic: playLogic}
};

async function processRoutes() {
    const currentRoute = window.location.pathname;
    
    if (routes.hasOwnProperty(currentRoute)) {
        App.innerHTML = await routes[currentRoute].run();
        routes[currentRoute].logic();
    }
    else
    {
        const pathList = location.pathname.split('/').filter(item => item);
        console.log(pathList);
        
        const pathData = {};
        const route = Object.keys(routes).find(key => {
            const keyList = key.split('/').filter(item => item);
            console.log(keyList);
            
            if (pathList.length !== keyList.length) return false;
            return keyList.every((item, ind) => {
                if (item[0] === ':')
                    return pathData[item.replace(':','')] = pathList[ind], true;
                return item === pathList[ind];
            });
        })
        if (route) {
            App.innerHTML = await routes[route].run(pathData);
            routes[route].logic(pathData);
        } else {
            //App.innerHTML = `<h1 style="text-align:center;">404 not found</h1>`
        }
    }

    console.log('route');
    
    // App.innerHTML = routes['/']();
    handleLinks();

}

window['router'] = processRoutes;
window['handleLinks'] = handleLinks;

function handleLinks() {
    document.querySelectorAll('a').forEach(link =>
            link.addEventListener('click', e => {
                e.preventDefault();
                const target = e.currentTarget as HTMLLinkElement;
                if (target.href) {
                    const newPath = target.href;
                    history.pushState({}, '', newPath);
                    processRoutes();
                }
            }))
}

function handleRouteChange() {
    window.addEventListener('popstate', processRoutes);
}




