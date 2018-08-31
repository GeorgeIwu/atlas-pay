import localforage from 'localforage';

// Auth dataStore
export let dataStore = localforage.createInstance({
    name: "atlasPayDashboard",
    storeName: 'dataStore'
});

// wrapper for indexDB
// localforage is async

// .then().catch()