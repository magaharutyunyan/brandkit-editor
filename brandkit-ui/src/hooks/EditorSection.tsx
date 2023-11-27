import useDragStart from "./useDragStart";
import useFileUploader from "./useFileUploader";
import {
  ImageData,
  serverUrl,
} from "../components/MainUserEditorPage/MainUserEditorPage";
import useStyles from "../styles/style";
import { handleDropUtil } from "../utils/handleDropUtil";
import { handleImageClickUtil } from "../utils/handleImageClickUtil";
import { handleEditButtonClickUtil } from "../utils/handleEditButtonClickUtil";
import { handleRemoveButtonClickUtil } from "../utils/handleRemoveButtonClickUtil";
import { handleRemoveBackgroundButtonClickUtil } from "../utils/handleRemoveBackgroundButtonClickUtil";
import {
  IconDelete,
  IconFrameExpand,
  IconRotateCircleFilled,
  IconBackgroundRemove,
} from "@picsart/icons";
import { useState } from "react";
import ImageCropper from "../components/ImageCropper/ImageCropper";

interface IEditorSection {
  section: string;
  logoState: ImageData[];
  setLogoState: React.Dispatch<React.SetStateAction<ImageData[]>>;
  imageState: ImageData[];
  setImageState: React.Dispatch<React.SetStateAction<ImageData[]>>;
  backgroundState: ImageData[];
  setBackgroundState: React.Dispatch<React.SetStateAction<ImageData[]>>;
  isCropping: boolean;
  setIsCropping: React.Dispatch<React.SetStateAction<boolean>>;
  isRotating: boolean;
  setIsRotating: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditorSection = ({
  section,
  logoState,
  setLogoState,
  imageState,
  setImageState,
  backgroundState,
  setBackgroundState,
  isCropping,
  setIsCropping,
  isRotating,
  setIsRotating,
}: IEditorSection) => {
  const classes = useStyles();
  const [selectedImage, setSelectedImage] = useState("");
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const handleFileUpload = useFileUploader(serverUrl);
  const handleDragStart = useDragStart(section.toLocaleLowerCase());
  const [currentState, setCurrentState] = (() => {
    switch (section) {
      case "Logos":
        return [logoState, setLogoState];
      case "Images":
        return [imageState, setImageState];
      case "Background":
        return [backgroundState, setBackgroundState];
      default:
        return [[], () => {}];
    }
  })();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDropUtil(e, {
      setLogoState,
      setImageState,
      setBackgroundState,
    });
  };

  const handleImageClick = (src: string) => {
    handleImageClickUtil(
      src,
      setSelectedImage,
      setIsCropping,
      setIsEditClicked
    );
  };

  const handleEditButtonClick = (src: string) => {
    handleEditButtonClickUtil(src, setIsEditClicked, setSelectedImage);
  };

  const handleRemoveButtonClick = (src: string) => {
    handleRemoveButtonClickUtil(src, currentState, setCurrentState);
  };

  const handleRemoveBackgroundButtonClick = (src: string) => {
    handleRemoveBackgroundButtonClickUtil(
      src,
      currentState,
      setCurrentState,
      serverUrl
    );
  };

  const handleLogoFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(event, (imageUrl) => {
      setCurrentState((prevState) => [
        ...prevState,
        {
          description: "",
          dominantColors: [],
          pathOrURL: imageUrl,
          size: "",
        },
      ]);
    });
  };

  const handleAddImageClick = () => {
    setCurrentState((prevState) => [
      ...prevState,
      {
        description: "",
        dominantColors: [],
        pathOrURL: inputValue,
        size: "",
      },
    ]);
    setInputValue("");
  };
  const handleCropButtonClick = (src: string) => {
    setSelectedImage(src);

    setIsCropping(!isCropping);
  };

  return (
    <div>
      <h2>{section}</h2>
      <div
        className={classes.imageWrapper}
        onDragOver={(e) => e.preventDefault()}
        data-section={section.toLocaleLowerCase()}
        onDrop={(e) => handleDrop(e)}
      >
        {currentState &&
          currentState.map((src, index) => (
            <div key={index} className={classes.imageCard}>
              <img
                src={src.pathOrURL}
                alt={`Image ${index}`}
                height={200}
                width={200}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, src)}
                onClick={() => handleImageClick(src.pathOrURL)}
                crossOrigin="anonymous"
              />
              {selectedImage === src.pathOrURL && !isEditClicked && (
                <div className={classes.actionButtons}>
                  <button onClick={() => handleCropButtonClick(src.pathOrURL)}>
                    <IconFrameExpand fill="black" />
                  </button>
                  {isCropping && (
                    <div className={classes.centeredImage}>
                    {/* <div> */}
                      <ImageCropper
                        imageToCrop={selectedImage}
                        setCurrentState={setCurrentState}
                      />
                    </div>
                  )}
                  <button onClick={() => handleEditButtonClick(src.pathOrURL)}>
                    <IconBackgroundRemove fill="black" />
                  </button>
                  <button
                    onClick={() => handleRemoveButtonClick(src.pathOrURL)}
                  >
                    <IconDelete fill="black" />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <div className={classes.inputFIeld}>
        <div>
          <input type="file" accept="image/*" onChange={handleLogoFileChange} />
        </div>
        <div>
          <input
            value={inputValue}
            onChange={(evt) => setInputValue(evt.target.value)}
            type="text"
          />
          <button onClick={handleAddImageClick}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default EditorSection;
