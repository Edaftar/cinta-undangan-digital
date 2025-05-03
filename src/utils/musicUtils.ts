
/**
 * Extracts YouTube video ID from a YouTube URL
 */
export const extractYoutubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Match standard YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Extracts Spotify track ID from a Spotify URL
 */
export const extractSpotifyId = (url: string): string | null => {
  if (!url) return null;

  // Match Spotify track URL formats
  const regExp = /^.*(spotify\.com\/track\/|spotify:track:)([a-zA-Z0-9]{22}).*/;
  const match = url.match(regExp);

  return match ? match[2] : null;
};

/**
 * Checks if the URL is a supported music URL format
 */
export const isSupportedMusicUrl = (url: string): boolean => {
  if (!url) return false;
  
  // Check if it's a direct audio URL
  if (url.match(/\.(mp3|ogg|wav|flac)$/i)) {
    return true;
  }

  // Check if it's YouTube
  if (extractYoutubeId(url)) {
    return true;
  }

  // Check if it's Spotify
  if (extractSpotifyId(url)) {
    return true;
  }

  return false;
};

/**
 * Creates an embedded player based on the URL type
 */
export const createEmbeddedPlayer = (url: string, autoplay: boolean = false): string => {
  const youtubeId = extractYoutubeId(url);
  const spotifyId = extractSpotifyId(url);

  if (youtubeId) {
    return `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${youtubeId}?autoplay=${autoplay ? '1' : '0'}&controls=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } 
  
  if (spotifyId) {
    return `<iframe src="https://open.spotify.com/embed/track/${spotifyId}" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
  }
  
  if (url.match(/\.(mp3|ogg|wav|flac)$/i)) {
    return `<audio ${autoplay ? 'autoplay' : ''} controls><source src="${url}" type="audio/${url.split('.').pop()}">Your browser does not support the audio element.</audio>`;
  }
  
  return '';
};
