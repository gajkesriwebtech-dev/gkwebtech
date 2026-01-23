export const getUnsplashUrl = (id: string, width = 800, quality = 65) => {
  // Extract ID if a full URL is provided
  let imageId = id;
  if (id.includes('unsplash.com/photo-')) {
    const match = id.match(/photo-([a-zA-Z0-9-]+)/);
    if (match && match[1]) {
      imageId = "photo-" + match[1];
    }
  } else if (id.startsWith('http') && id.includes('unsplash.com')) {
     // Handle other unsplash formats if any, or return as is if not parseable
     // But for now we assume standard photo-ID format or just ID
  }

  // If it's already a full URL but we want to re-parameterize:
  // We can just strip query params and append new ones if we are sure of the base.
  // But safest is to extract the ID.

  return `https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=${width}&q=${quality}`;
};

export const optimizeUnsplashUrl = (url: string, width: number) => {
    if (!url.includes('unsplash.com')) return url;
    return url.replace(/&w=\d+/, `&w=${width}`);
};
