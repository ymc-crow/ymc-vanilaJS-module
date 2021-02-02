const DB_NAME = 'MyTestDatabase';
const STORE_NAME = 'ajaxHistory'; 


let db;

const createDB = () => {
  return new Promise((resolve) => {
    if (db) return resolve(db);
    if (!window.indexedDB) {
      console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
      return null;
    }
    const request = window.indexedDB.open(DB_NAME);
    
    request.onerror = function(event) {
      resolve(null);
    };
    request.onsuccess = function(event) {
      db = event.target.result;
      resolve(db)
    };
    request.onupgradeneeded = function(event) {
      db = event.target.result;
      if (db.objectStoreNames.contains(STORE_NAME)) {
        db.deleteObjectStore(STORE_NAME);
      }
      db.createObjectStore(STORE_NAME, { keyPath: 'keyVal' });
    };
  });
};

const getStore = () => {
  const dbPromise = createDB();
  return new Promise((resolve) => {
    dbPromise.then(db => {
      resolve(db.transaction(STORE_NAME, 'readwrite').objectStore(STORE_NAME));
    });
  });
};

export const addResultCache = async data => {
  const store = await getStore()
  store?.put(data);
};

export const getResultCache = (key) => {
  return new Promise((resolve) => {
    const storePromise = getStore();
    storePromise.then(store => {
      if (!store) {
        return resolve(null);
      };
      const req = store.get(key);
      req.onsuccess = event => {
        resolve(event?.target?.result);
      };
      req.onerror = err => {
        console.log(err);
        resolve(null);
      };
    });
  });
};

