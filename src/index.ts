import Library from "./pages/Library/";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Album from "./pages/Library/Album";
import LikedSongs from "./pages/Library/LikedSongs";
import Play, {playLogic} from "./pages/Play";

import data from './data/data.json';

const App = document.getElementById('app')!;
const routes = {
    '/': {run: Home, logic: ()=>{}},
    '/search': {run: Search, logic: ()=>{}},
    '/library': {run: Library('albums'), logic: ()=>{}},
    '/library/albums': {run: Library('albums'), logic: ()=>{}},
    '/library/artists': {run: Library('artists'), logic: ()=>{}},
    '/library/playlists': {run: Library('playlists'), logic: ()=>{}},
    '/library/album/:id': {run: Album, logic: ()=>{}},
    '/library/liked-songs': {run: LikedSongs, logic: ()=>{}},
    '/play/:id': {run: Play, logic: playLogic}
};

async function processRoutes() {
    const currentRoute = window.location.pathname;
    
    if (routes.hasOwnProperty(currentRoute))
        App.innerHTML = await routes[currentRoute].run();
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
            App.innerHTML = `<h1 style="text-align:center;">404 not found</h1>`
        }
    }

    console.log('route');
    
    // App.innerHTML = routes['/']();
    handleLinks();
    document.querySelector('.back-icon')?.addEventListener('click', e => {
        history.back();
    })
}

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

processRoutes();
handleRouteChange();


const database = indexedDB.open('data',1);

database.addEventListener('upgradeneeded', e => {
    const db = database.result;
    switch(e.oldVersion) {
        case 0:
            const store = db.createObjectStore('albums', {
                keyPath: 'id'
            });
            data.forEach(item => {
                item.musics.forEach(elm => {
                    elm.is_liked = false;
                    elm.is_searched = false;
                    elm.is_downloaded = false;
                    elm.is_played = false;
                })
                item.album['is_searched'] =false;
                item['id'] = item.album.id;
                store.add(item);
            });
            
    }
})

database.onsuccess = () => {
    console.log('access database successful');
}


