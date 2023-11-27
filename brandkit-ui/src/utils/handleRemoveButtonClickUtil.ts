import { ImageData } from "../components/MainUserEditorPage/MainUserEditorPage";

export const handleRemoveButtonClickUtil = (
  src: string,
  state: ImageData[],
  setState: React.Dispatch<React.SetStateAction<ImageData[]>>
) => {
  if (state) {
    const filteredArray = state.filter((item) => item.pathOrURL !== src);
    setState(filteredArray);
  } else {
    setState([]);
  }
};