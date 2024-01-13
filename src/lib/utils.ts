import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const uploadImage = async (files: File[]): Promise<string> => {
  if (files && files.length > 0) {
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'hangoutz_preset');
    console.log(import.meta.env.VITE_CLOUDINARY_NAME);
    try {
      const data = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_NAME
        }/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      ).then((res) => res.json());
      return data.secure_url;
    } catch (error: any) {
      throw new Error(`(uploadToCloudinary): ${error.message}`);
    }
  }
  return '';
};
