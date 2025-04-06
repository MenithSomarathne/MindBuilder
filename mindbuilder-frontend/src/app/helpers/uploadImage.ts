interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  format?: string;
  resource_type?: string;
  width?: number;
  height?: number;
  bytes?: number;
  created_at?: string;
  original_filename?: string;
  [key: string]: any;
}

const uploadImage = async (image: File): Promise<CloudinaryResponse> => {
  const CLOUD_NAME = process.env.REACT_APP_CLOUD_NAME_CLOUDINARY;
  if (!CLOUD_NAME) {
    throw new Error("Cloudinary cloud name is not defined in environment variables.");
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern-app");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Image upload failed: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadImage;
