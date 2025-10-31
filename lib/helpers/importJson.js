const fs = require("fs");
const path = require("path");

// Læs JSON-fil
const importJSON = (filename) => {
  try {
    const fullPath = path.resolve(__dirname, `../../data/${filename}`);
    const data = fs.readFileSync(fullPath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error(`Fejl ved læsning af JSON-fil: ${err.message}`);
    return [];
  }
};

// EXPORT JSON-fil
const exportJSON = (data, filename) => {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(path.resolve(filename), jsonData, "utf-8");
    console.log(`Data gemt som ${filename}`);
  } catch (err) {
    console.error(`Fejl ved eksport af JSON-fil: ${err.message}`);
  }
};

module.exports = { importJSON, exportJSON };
