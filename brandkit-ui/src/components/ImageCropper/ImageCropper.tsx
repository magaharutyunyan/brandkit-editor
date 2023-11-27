import { useState } from "react";
import { ImageData } from "../MainUserEditorPage/MainUserEditorPage";
import ReactCrop, { Crop } from "react-image-crop";
import { handleSaveResult } from "../../utils/handleSaveResult";
import "react-image-crop/dist/ReactCrop.css";
import { serverUrl } from "../MainUserEditorPage/MainUserEditorPage";
import axios from 'axios';


const TO_RADIANS = Math.PI / 180;

interface ImageCropperProps {
  imageToCrop: string;
  setCurrentState: React.Dispatch<React.SetStateAction<ImageData[]>>;
}

const ImageCropper = ({ imageToCrop, setCurrentState }: ImageCropperProps) => {
  const [image, setImage] = useState<any>(null);
  const [completedCrop, setCompletedCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const [rotation, setRotation] = useState(0);

  const rotateRight = () => {
    let newRotation = rotation + 90;
    if (newRotation >= 360) {
      newRotation = -360;
    }
    setRotation(newRotation);
  };

  const saveResult = async () => {
    const {dataUrl, width, height} = await handleSaveResult(image, completedCrop, rotation);
    const formData = new FormData()
    formData.append('base64_url', dataUrl);
    axios.post(`${serverUrl}/brandkit_api/valid_url`, formData)
                .then(response => {
                    console.log(response.data);
                    const dataUrl = response.data;

                    setCurrentState((prevState) => {
                      const newState = prevState.map((item) => {
                        if (item.pathOrURL === imageToCrop) {
                          return {
                            ...item,
                            pathOrURL: dataUrl,
                            size: `${width}x${height}`,
                          };
                        }
                        return item;
                      });
                      console.log(newState);
                      return newState; 
                    });           
                  });  
  };

  const onImageLoaded = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const image = event.currentTarget;
    image.crossOrigin = "anonymous";
    setImage(image);
    setCompletedCrop({
      x: 0,
      y: 0,
      height: event?.currentTarget?.height,
      width: event?.currentTarget?.width,
      unit: "px",
    });
  };
  return (
    <>
      <ReactCrop
        crop={crop}
        onChange={setCrop}
        onComplete={(e) => setCompletedCrop(e)}
      >
        <img
          alt="Crop"
          src={imageToCrop}
          style={{ transform: `rotate(${rotation}deg)` }}
          onLoad={onImageLoaded}
        />
      </ReactCrop>
      <button onClick={rotateRight}>rotate</button>
      <button onClick={saveResult}>Process Image</button>
    </>
  );
};

export default ImageCropper;
