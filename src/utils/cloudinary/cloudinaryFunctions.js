export const uploadImageToCloudinary = async (file, publicId = null) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "forms-project-cloudinary"); 
  if (publicId) {
    formData.append("public_id", publicId);
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dmi1xxumf/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Uploaded image:", data);
      return data;
    } else {
      console.error("Failed to upload image:", await response.text());
    }
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export const fetchImageById = async (publicId) => {
  const imageUrl = `https://res.cloudinary.com/dmi1xxumf/image/upload/${publicId}`;
  console.log("Image URL:", imageUrl);
  return imageUrl;
};

export const urlToFile = async (url, filename = "image") => {
  const response = await fetch(`https://res.cloudinary.com/dmi1xxumf/image/upload/${url}`);
  const blob = await response.blob();
  const file = new File([blob], filename, { type: blob.type });
  return file;
};

export const deleteImageInCloud = async (publicId) => {
  try {
    const response = await fetch("https://forms-project-backend-p0dd.onrender.com/delete-image", {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ public_id: publicId }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log('Image deleted:', data);
    } else {
      console.error('Error deleting image:', data);
    }
  } catch (error) {
    console.error('Failed to delete image:', error);
  }
};