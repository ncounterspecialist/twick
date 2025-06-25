
import type { MediaItem } from '@twick/video-editor';
import { useEffect, useState } from 'react';
import { getMediaManager } from '../shared/media-manager';
import FileInput from '../shared/file-input';

interface MediaPanelProps {
  onSelect?: (item: MediaItem) => void;
}

export const MediaPanel = ({ onSelect }: MediaPanelProps) => {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [showOnlyImages, setShowOnlyImages] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const mediaManager = getMediaManager();

  useEffect(() => {
    const loadItems = async () => {
      const results = await mediaManager.search({ query: searchQuery });
      setItems(results);
    };
    loadItems();
  }, [searchQuery]);

  const handleFileUpload = async (fileData: { file: File; blobUrl: string }) => {
    const arrayBuffer = await fileData.file.arrayBuffer();
    const newItem = await mediaManager.addItem({
      url: fileData.blobUrl,
      type: fileData.file.type.startsWith('image/') ? 'image' : 'video',
      arrayBuffer,
      metadata: {
        name: fileData.file.name,
        size: fileData.file.size,
        type: fileData.file.type
      }
    });
    setItems(prev => [...prev, newItem]);
  };

  const filteredItems = items.filter(item => {
    const matchesType = !showOnlyImages || item.type === 'image';
    return matchesType;
  });

  return (
    <div className="flex flex-col gap-4 p-2 w-[320px] border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-900">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search media..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 rounded-lg border border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FileInput
            acceptFileTypes={['image/*', 'video/*']}
            onFileLoad={handleFileUpload}
            buttonText="Upload"
            id="media-upload"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <input
            type="checkbox"
            checked={showOnlyImages}
            onChange={(e) => setShowOnlyImages(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Show only images</span>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 overflow-y-auto max-h-[400px] pr-2">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect?.(item)}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200"
          >
            {item.type === 'image' ? (
              <img
                src={item.url}
                alt=""
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <video
                src={item.url}
                poster={item.thumbnail}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-20" />
          </div>
        ))}
      </div>
    </div>
  );
};
