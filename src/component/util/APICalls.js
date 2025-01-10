export const base64Decode = (base64data) => {
  try {
    return decodeURIComponent(escape(atob(base64data))); // Handles UTF-8 decoding
  } catch (error) {
    console.error("Base64 decoding failed:", error);
    return null;
  }
};

export const base64Encode = (text) => {
  try {
    return btoa(unescape(encodeURIComponent(text))); // Handles UTF-8 encoding
  } catch (error) {
    console.error("Base64 encoding failed:", error);
    return null;
  }
};
