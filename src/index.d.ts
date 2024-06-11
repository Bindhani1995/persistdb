// index.d.ts

declare class PersistDB<T> {
  private db: IDBDatabase | null;

  constructor(dbName: string, storeName: string);

  private initDB(): void;

  private getObjectStore(mode: IDBTransactionMode): IDBObjectStore;

  add(item: T): Promise<number>;

  update(id: number, item: T): Promise<void>;

  remove(id: number): Promise<void>;

  get(id: number): Promise<T | undefined>;

  getAll(): Promise<T[]>;
}

export default PersistDB;
