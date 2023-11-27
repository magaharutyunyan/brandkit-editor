export const handleEditButtonClickUtil = (
    src: string,
    setIsEditClicked: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedImage: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const editIcon = document.getElementById("EditIcon");
    const removeIcon = document.getElementById("RemoveIcon");
    if (editIcon && removeIcon) {
      editIcon.style.display = "none";
      removeIcon.style.display = "none";
    }
    setIsEditClicked(true);
    setSelectedImage(src);
  };