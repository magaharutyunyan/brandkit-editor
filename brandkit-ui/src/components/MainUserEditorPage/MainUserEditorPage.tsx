import { useEffect, useState } from "react";
import useStyles from "../../styles/style";
import EditorSection from "../../hooks/EditorSection";
export const serverUrl = "http://192.168.40.187:8000";

export interface ImageData {
  description: string;
  dominantColors: string[];
  pathOrURL: string;
  size: string;
}

type TImageData = ImageData[];

const MainUserEditorPage = () => {
  const [imageState, setImageState] = useState<TImageData>([]);
  const [logoState, setLogoState] = useState<TImageData>([]);
  const [backgroundState, setBackgroundState] = useState<TImageData>([]);
  const [isCropping, setIsCropping] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    (async () => {
      fetch(`${serverUrl}/brandkit_api/initial_view`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          
          return response.json();
        })
        .then((data) => {          
          console.log(data);
          
          setLogoState(data[0]);
          setImageState(data[1]);
          setBackgroundState(data[2]);
        })
        .catch((error) => {
          console.error("Error fetching initial view:", error);
        });
    })();
  }, []);

  const saveChanges = () => {
    const dataToSend = {
      logos: logoState || [],
      images: imageState || [],
      backgroundImages: backgroundState || [],
    };
    console.log(dataToSend);
    
    fetch(`${serverUrl}/brandkit_api/save_brandkit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error saving changes:", error);
      });
  };

  return (
    <div>
      <section className={classes.mainContainer}>
        <EditorSection
          section="Logos"
          logoState={logoState}
          setLogoState={setLogoState}
          imageState={imageState}
          setImageState={setImageState}
          backgroundState={backgroundState}
          setBackgroundState={setBackgroundState}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
        <EditorSection
          section="Images"
          logoState={logoState}
          setLogoState={setLogoState}
          imageState={imageState}
          setImageState={setImageState}
          backgroundState={backgroundState}
          setBackgroundState={setBackgroundState}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
        <EditorSection
          section="Background"
          logoState={logoState}
          setLogoState={setLogoState}
          imageState={imageState}
          setImageState={setImageState}
          backgroundState={backgroundState}
          setBackgroundState={setBackgroundState}
          isCropping={isCropping}
          setIsCropping={setIsCropping}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
        />
        <button onClick={saveChanges}>Save</button>
      </section>
    </div>
  );
};

export default MainUserEditorPage;
