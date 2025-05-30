interface DBConfig {
  name: string;
  version: number;
  storeName: string;
  keyPath?: string;
}

class IndexedDBHelper implements DBConfig {
  private db: IDBDatabase | null = null;
  public readonly name: string;
  public readonly version: number;
  public readonly storeName: string;
  public readonly keyPath: string;

  constructor(config: DBConfig) {
    this.name = config.name;
    this.version = config.version;
    this.storeName = config.storeName;
    this.keyPath = config.keyPath || "id";

    this.init();
  }

  // 初始化数据库
  private async init(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.name, this.version);

      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, {
            keyPath: this.keyPath,
            autoIncrement: true,
          });
          // 创建索引（示例）
          store.createIndex("id", "id", { unique: true });
        }
      };

      request.onsuccess = () => {
        this.db = request.result as IDBDatabase;
        resolve(this.db);
      };

      request.onerror = (event: Event) => {
        reject((event.target as IDBOpenDBRequest).error);
      };
    });
  }

  // 添加数据
  public async add(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.add(item);
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  // 查询数据
  public async get(key: IDBValidKey): Promise<any | undefined> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readonly");
      const store = transaction.objectStore(this.storeName);

      const request = store.get(key);
      request.onsuccess = () => resolve(request.result);
      request.onerror = reject;
    });
  }

  // 更新数据
  public async update(item: any): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.put(item);
      request.onsuccess = () => resolve();
      request.onerror = reject;
    });
  }

  // 删除数据
  public async delete(key: IDBValidKey): Promise<void> {
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.storeName, "readwrite");
      const store = transaction.objectStore(this.storeName);

      const request = store.delete(key);
      request.onsuccess = () => resolve();

      request.onerror = reject;
    });
  }
}

export default new IndexedDBHelper({
  name: "myDatabase",
  version: 1,
  storeName: "fileListStore",
});
