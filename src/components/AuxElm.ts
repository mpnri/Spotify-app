const Aux = component => {
    return () => new Promise<string>((resolve, reject) => {
        const database = indexedDB.open('data', 1);
        database.addEventListener('success', e => {
            const db = database.result;
            if (db.objectStoreNames.contains('albums')) {
                const transaction = db.transaction('albums', "readonly");
                const store = transaction.objectStore('albums');

                const albums = store.getAll();
                albums.addEventListener('success', e => {
                    resolve(component(albums.result))
                })
            }
        });
    })
}


export default Aux;
