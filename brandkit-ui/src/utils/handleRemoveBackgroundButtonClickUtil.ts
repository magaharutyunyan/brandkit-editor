import { ImageData } from "../components/MainUserEditorPage/MainUserEditorPage";

export const handleRemoveBackgroundButtonClickUtil = (
    src: string,
    state: ImageData[],
    setState: React.Dispatch<React.SetStateAction<ImageData[]>>,
    serverUrl: string
  ) => {
    console.log('a');
    
    fetch(`${serverUrl}/api/removeBackground`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ src })
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      const { newImageUrl } = data;
      if (state && newImageUrl) {
        const updatedState = state.map(item => {
          if (item.pathOrURL === src) {
            return { ...item, pathOrURL: newImageUrl };
          }
          return item;
        });
        setState(updatedState);
      }
    })
    .catch((error) => {
      console.error("Error removing background:", error);
    });
  };
  