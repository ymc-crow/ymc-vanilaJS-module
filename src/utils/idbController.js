const KEY_VALUE = 'key'; // don't change!!

export default class idbController {
  #dbName;
  #storeName;
  #db
  constructor({ dbName, storeName }={}) {
      this.#dbName = dbName;
      this.#storeName = storeName;
  }

  #createDB() {
    return new Promise((resolve) => {
      if (this.#db) return resolve(this.#db);
      if (!window.indexedDB) {
        console.log("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        return null;
      }
      const request = window.indexedDB.open(this.#dbName);
      
      request.onerror = () => resolve(null); 
      request.onsuccess = event => resolve(this.#db = event.target.result);
      request.onupgradeneeded = event => {
        const db = this.#db = event.target.result;
        if (db.objectStoreNames.contains(this.#storeName)) {
          db.deleteObjectStore(this.#storeName);
        }
        db.createObjectStore(this.#storeName, { keyPath: KEY_VALUE });
        const transaction = event.target.transaction;
        transaction.oncomplete = () => resolve(db);
      };
    });
  }

  #getStore() {
    const dbPromise = this.#createDB();
    const storeName = this.#storeName;
    return dbPromise.then(db => db.transaction(storeName, 'readwrite').objectStore(storeName));
  }

  async addResultCache(data) {
    if (!data?.key) throw new Error(`stored object must have "key" property`);
    const store = await this.#getStore();
    store?.put(data);
  }

  getResultCache(key) {
    return new Promise((resolve) => {
      const storePromise = this.#getStore();
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
  }
};
