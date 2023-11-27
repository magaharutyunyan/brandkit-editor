import { ImageData } from "../components/MainUserEditorPage/MainUserEditorPage";

interface IEditorSection {
  setLogoState: React.Dispatch<React.SetStateAction<ImageData[]>>;
  setImageState: React.Dispatch<React.SetStateAction<ImageData[]>>;
  setBackgroundState: React.Dispatch<React.SetStateAction<ImageData[]>>;
}

type SectionName = "logos" | "images" | "background";

export const handleDropUtil = (
  e: React.DragEvent<HTMLDivElement>,
  {
    setLogoState,
    setImageState,
    setBackgroundState,
  }: IEditorSection
) => {
  e.preventDefault();

  const srcAsString = e.dataTransfer.getData("src");
  const section = e.dataTransfer.getData("section") as SectionName;
  const destination = e.currentTarget.getAttribute("data-section") as SectionName;

  const newItem: ImageData = JSON.parse(srcAsString);
  console.log('newItem:', newItem);

  if (section !== destination) {
    if (section === 'logos') setLogoState(logoState => logoState.filter(item => item.pathOrURL !== newItem.pathOrURL));
    if (section === 'images') setImageState(imageState => imageState.filter(item => item.pathOrURL !== newItem.pathOrURL));
    if (section === 'background') setBackgroundState(backgroundState => backgroundState.filter(item => item.pathOrURL !== newItem.pathOrURL));
  }
  if (destination === 'logos' && destination !== section) setLogoState(logoState => [...logoState, newItem]);
  if (destination === 'images' && destination !== section) setImageState(imageState => [...imageState, newItem]);
  if (destination === 'background' && destination !== section) setBackgroundState(backgroundState => [...backgroundState, newItem]);
};
