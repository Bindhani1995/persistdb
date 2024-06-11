class BrowserDB {
  private db: IDBDatabase | null = null;

  constructor(private dbName: string, private storeName: string) {
    this.initDB();
  }

  private initDB(): void {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(this.storeName)) {
        db.createObjectStore(this.storeName, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event) => {
      console.error(
        'Error opening database:',
        (event.target as IDBOpenDBRequest).error
      );
    };
  }

  private getObjectStore(mode: IDBTransactionMode): IDBObjectStore {
    if (!this.db) {
      throw new Error('Database is not initialized');
    }
    return this.db
      .transaction(this.storeName, mode)
      .objectStore(this.storeName);
  }

  async add<T>(item: T): Promise<number> {
    const store = this.getObjectStore('readwrite');
    return new Promise((resolve, reject) => {
      const request = store.add(item);

      request.onsuccess = () => resolve(request.result as number);
      request.onerror = () => reject(request.error);
    });
  }

  async update<T>(id: number, item: T): Promise<void> {
    const store = this.getObjectStore('readwrite');
    return new Promise((resolve, reject) => {
      const request = store.put({ ...item, id });

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async remove(id: number): Promise<void> {
    const store = this.getObjectStore('readwrite');
    return new Promise((resolve, reject) => {
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async get<T>(id: number): Promise<T | undefined> {
    const store = this.getObjectStore('readonly');
    return new Promise((resolve, reject) => {
      const request = store.get(id);

      request.onsuccess = () => resolve(request.result as T);
      request.onerror = () => reject(request.error);
    });
  }

  async getAll<T>(): Promise<T[]> {
    const store = this.getObjectStore('readonly');
    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result as T[]);
      request.onerror = () => reject(request.error);
    });
  }
}

export default BrowserDB;
