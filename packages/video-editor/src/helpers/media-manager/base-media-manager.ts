import { MediaItem, PaginationOptions, SearchOptions } from "../types";

  
  // Base abstract class that defines the interface
  abstract class BaseMediaManager {
    abstract addItem(item: Omit<MediaItem, 'id'>): Promise<MediaItem>;
    abstract addItems(items: Omit<MediaItem, 'id'>[]): Promise<MediaItem[]>;
    abstract getItem(id: string): Promise<MediaItem | undefined>;
    abstract getItems(options?: PaginationOptions): Promise<MediaItem[]>;
    abstract updateItem(id: string, updates: Partial<MediaItem>): Promise<MediaItem | undefined>;
    abstract updateItems(updates: { id: string; updates: Partial<MediaItem> }[]): Promise<MediaItem[]>;
    abstract deleteItem(id: string): Promise<boolean>;
    abstract deleteItems(ids: string[]): Promise<boolean>;
    abstract search(options: SearchOptions): Promise<MediaItem[]>;
    abstract getTotalCount(): Promise<number>;
  }
  
  export default BaseMediaManager;