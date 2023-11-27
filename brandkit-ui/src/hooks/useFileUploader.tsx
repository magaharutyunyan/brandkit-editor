import { useCallback } from 'react';

type UploadCallback = (imageUrl: string) => void;

const useFileUploader = (serverUrl: string) => {
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>, callback: UploadCallback) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const formData = new FormData();
      formData.append('file', file);

      fetch(`${serverUrl}/brandkit_api/valid_url`, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const imageUrl = data;
        callback(imageUrl);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  }, [serverUrl]);

  return handleFileUpload;
};

export default useFileUploader;
