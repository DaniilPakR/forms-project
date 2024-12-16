// 352349418547498
// dmi1xxumf
// forms-project-cloudinary

export const uploadImageToCloudinary = async (file, publicId = null) => {
  const formData = new FormData();
  formData.append("file", file); // Attach the file
  formData.append("upload_preset", "forms-project-cloudinary"); // Replace with your preset
  if (publicId) {
    formData.append("public_id", publicId); // Attach ID if needed
  }

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dmi1xxumf/image/upload`, // Replace `your_cloud_name`
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Uploaded image:", data); // Contains `url`, `secure_url`, `public_id`, etc.
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