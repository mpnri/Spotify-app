import Home from "./pages/Home";
import Search from "./pages/Search";

const App = document.getElementById('app')!;
const routes = {
    '/': Home,
    '/search': Search,
};

function processRoutes() {
    const currentRoute = window.location.pathname;
    if (routes.hasOwnProperty(currentRoute))
        App.innerHTML = routes[currentRoute]();
    else 
        App.innerHTML = '';
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
