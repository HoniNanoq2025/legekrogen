const getImageUrl = (relativePath) => {
  const baseUrl = process.env.BASE_URL || "http://localhost:5000";
  return `${baseUrl}${relativePath}`;
};

module.exports = { getImageUrl };
