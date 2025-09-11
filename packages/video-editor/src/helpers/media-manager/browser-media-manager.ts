import BaseMediaManager from "./base-media-manager";
import { MediaItem, PaginationOptions, SearchOptions } from "../types";

class BrowserMediaManager extends BaseMediaManager {
    private dbName = 'mediaStore';
    private storeName = 'mediaItems';
    private db: IDBDatabase | null = null;
  
    private async initDB(): Promise<IDBDatabase> {
      if (this.db) return this.db;
  
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
  
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          this.db = request.result;
          resolve(request.result);
        };
  
        request.onupgradeneeded = (event) => {
          const db = (event.target as IDBOpenDBRequest).result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            const store = db.createObjectStore(this.storeName, { keyPath: 'id' });
            store.createIndex('type', 'type', { unique: false });
          }
        };
      });
    }
  
    private async getStore(mode: IDBTransactionMode = 'readonly') {
      const db = await this.initDB();
      const transaction = db.transaction(this.storeName, mode);
      return transaction.objectStore(this.storeName);
    }

    private async convertArrayBufferToBlob(arrayBuffer: ArrayBuffer, type: string): Promise<Blob> {
      return new Blob([arrayBuffer], { type });
    }
  
    async addItem(item: Omit<MediaItem, 'id'>): Promise<MediaItem> {
      const newItem: MediaItem = {
        ...item,
        id: crypto.randomUUID()
      };

      const store = await this.getStore('readwrite');
      await new Promise((resolve, reject) => {
        const request = store.add(newItem);
        request.onsuccess = () => resolve(newItem);
        request.onerror = () => reject(request.error);
      });
      return newItem;
    }
  
    async addItems(items: Omit<MediaItem, 'id'>[]): Promise<MediaItem[]> {
      const newItems = await Promise.all(items.map(async item => {
        const newItem = {
          ...item,
          id: crypto.randomUUID()
        };
        return newItem;
      }));

      const store = await this.getStore('readwrite');
      await Promise.all(newItems.map(item => 
        new Promise((resolve, reject) => {
          const request = store.add(item);
          request.onsuccess = () => resolve(item);
          request.onerror = () => reject(request.error);
        })
      ));
      return newItems;
    }
  
    async getItem(id: string): Promise<MediaItem | undefined> {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const request = store.get(id);
        request.onsuccess = async () => {
          const item = request.result;
          if (item?.arrayBuffer) {
            item.blob = await this.convertArrayBufferToBlob(item.arrayBuffer, item.type);
            item.url = URL.createObjectURL(item.blob);
          }
          resolve(item);
        };
        request.onerror = () => reject(request.error);
      });
    }
  
    async getItems(options?: PaginationOptions): Promise<MediaItem[]> {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = async () => {
          let items = request.result;
          if (!options) {
            items = await Promise.all(items.map(async item => {
              if (item?.arrayBuffer) {
                item.blob = await this.convertArrayBufferToBlob(item.arrayBuffer, item.type);
                item.url = URL.createObjectURL(item.blob);
              }
              return item;
            }));
            resolve(items);
            return;
          }
          const { page, limit } = options;
          const start = (page - 1) * limit;
          const end = start + limit;
          items = await Promise.all(items.slice(start, end).map(async item => {
            if (item?.arrayBuffer) {
              let blob = await this.convertArrayBufferToBlob(item.arrayBuffer, item.type);
              item.url = URL.createObjectURL(blob);
            }
            return item;
          }));
          resolve(items);
        };
        request.onerror = () => reject(request.error);
      });
    }
  
    async updateItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | undefined> {
      const store = await this.getStore('readwrite');
      const item = await this.getItem(id);
      if (!item) return undefined;
  
      const updatedItem = { ...item, ...updates, id };
      await new Promise((resolve, reject) => {
        const request = store.put(updatedItem);
        request.onsuccess = () => resolve(updatedItem);
        request.onerror = () => reject(request.error);
      });
      return updatedItem;
    }
  
    async updateItems(updates: { id: string; updates: Partial<MediaItem> }[]): Promise<MediaItem[]> {
      const store = await this.getStore('readwrite');
      const updatedItems: MediaItem[] = [];
  
      for (const { id, updates: itemUpdates } of updates) {
        const item = await this.getItem(id);
        if (item) {
          const updatedItem = { ...item, ...itemUpdates, id };
          await new Promise((resolve, reject) => {
            const request = store.put(updatedItem);
            request.onsuccess = () => {
              updatedItems.push(updatedItem);
              resolve(updatedItem);
            };
            request.onerror = () => reject(request.error);
          });
        }
      }
  
      return updatedItems;
    }
  
    async deleteItem(id: string): Promise<boolean> {
      const store = await this.getStore('readwrite');
      return new Promise((resolve, reject) => {
        const request = store.delete(id);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    }
  
    async deleteItems(ids: string[]): Promise<boolean> {
      const store = await this.getStore('readwrite');
      return new Promise((resolve, reject) => {
        const request = store.delete(ids);
        request.onsuccess = () => resolve(true);
        request.onerror = () => reject(request.error);
      });
    }
  
    async search(options: SearchOptions): Promise<MediaItem[]> {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const request = store.getAll();
        request.onsuccess = async () => {
          let items = request.result;
          const filteredItems = items.filter(item => {
            const matchesQuery = item.url.toLowerCase().includes((options.query || '').toLowerCase());
            const matchesType = !options.type || item.type === options.type;
            const matchesMetadata = !options.metadata || 
              Object.entries(options.metadata).every(([key, value]) => 
                item.metadata?.[key] === value
              );
            return matchesQuery && matchesType && matchesMetadata;
          });

          // Convert array buffers to blobs for filtered items
          items = await Promise.all(filteredItems.map(async item => {
            if (item?.arrayBuffer) {
              item.blob = await this.convertArrayBufferToBlob(item.arrayBuffer, item.type);
              item.url = URL.createObjectURL(item.blob);
            }
            return item;
          }));

          resolve(items);
        };
        request.onerror = () => reject(request.error);
      });
    }

    async getTotalCount(): Promise<number> {
      const store = await this.getStore();
      return new Promise((resolve, reject) => {
        const request = store.count();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }
}

export default BrowserMediaManager;