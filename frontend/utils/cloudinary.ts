const CLOUD_NAME = "dnzbwokjy";

export const cld = (
  publicId: string,
  width = 1200
) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto:eco,w_${width}/${publicId}`;

export const cldFetch = (
  remoteUrl: string,
  width = 200
) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/f_auto,q_auto:eco,w_${width}/${remoteUrl}`;

export const optimizeCloudinaryUrl = (url: string, width: number) => {
  if (!url.includes('cloudinary.com')) return url;
  // Regex to replace w_...
  if (url.includes(',w_')) {
      return url.replace(/,w_\d+/, `,w_${width}`);
  }
  if (url.includes('/w_')) {
      return url.replace(/\/w_\d+/, `/w_${width}`);
  }
  // If no width present, insert it. This is harder with Cloudinary URL structure.
  // Assuming standard upload/ format.
  if (url.includes('/upload/')) {
      return url.replace('/upload/', `/upload/f_auto,q_auto:eco,w_${width}/`);
  }
  return url;
};
