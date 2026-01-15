// frontend/utils/cloudinary.ts
const CLOUD_NAME = "dnzbwokjy"; 

export const cld = (
  publicId: string,
  width = 1200
) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
