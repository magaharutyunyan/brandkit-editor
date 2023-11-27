import { useCallback } from 'react';
import { ImageData } from '../components/MainUserEditorPage/MainUserEditorPage';

type DragStartHandler = (e: React.DragEvent<HTMLImageElement>, src: ImageData) => void;

const useDragStart = (section: string): DragStartHandler => {
  const handleDragStart = useCallback((e: React.DragEvent<HTMLImageElement>, src: ImageData) => {
    const srcAsString = JSON.stringify(src)
    e.dataTransfer.setData('src', srcAsString);
    e.dataTransfer.setData('section', section);
  }, [section]);

  return handleDragStart;
};

export default useDragStart;