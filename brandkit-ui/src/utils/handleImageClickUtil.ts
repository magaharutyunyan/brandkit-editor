export const handleImageClickUtil = (
    src: string,
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>,
    setIsCropping: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEditClicked: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setSelectedImage(src);
    setIsCropping(false);
    setIsEditClicked(false);
  };