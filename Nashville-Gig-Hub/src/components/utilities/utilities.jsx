export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  let formattedTime = date
    .toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  formattedTime = formattedTime.replace(/\s/g, "");

  return { formattedDate, formattedTime };
};


export const extractSpotifyArtistId = (url) => {
  try {
    const matches = url.match(/spotify\.com\/artist\/([a-zA-Z0-9]+)/);
    return matches?.[1] || null;
  } catch {
    return null;
  }
};