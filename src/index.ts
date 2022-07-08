import Library from "./pages/Library/";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Album from "./pages/Library/Album";

const App = document.getElementById('app')!;
const routes = {
    '/': Home,
    '/search': Search,
    '/library': Library('albums'),
    '/library/albums': Library('albums'),
    '/library/artists': Library('artists'),
    '/library/playlists': Library('playlists'),
    '/library/album/:id': Album
};

function processRoutes() {
    const currentRoute = window.location.pathname;
    if (routes.hasOwnProperty(currentRoute))
        App.innerHTML = routes[currentRoute]();
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
            App.innerHTML = routes[route](pathData);
        } else {
            App.innerHTML = `<h1 style="text-align:center;">404 not found</h1>`
        }
    }

    console.log('route');
    
    // App.innerHTML = routes['/']();
    handleLinks();
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
