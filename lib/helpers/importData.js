// Native NODE JS moduler, ingen installation nødvendigt
const fs = require("fs"); // Fill-system modul til at læse og skrive filer
const path = require("path"); // Modul til håndtering af filstier

/**
 * Læs JSON-fil og returner array af produkter
 * @param {string} filePath - relativ sti til JSON-fil
 * @returns {Array} - array med produkter
 */

const readJSONFile = (filePath) => {
  try {
    // Konverter relativ sti til absolut sti
    const fullPath = path.resolve(filePath);

    //Læs fil som tekst
    const data = fs.readFileSync(fullPath, "utf-8");
    //Konverter tekst til Javascript objekt
    return JSON.parse(data);
  } catch (error) {
    console.error(`Fejl ved læsning af JSON-fil: ${error.message}`);
    return [];
  }
};

/**
 * Gem et array som JSON-fil (kan importeres til MongoDB Compass)
 * @param {Array} data - array med produkter
 * @param {string} fileName - output filnavn */

const exportToJSON = (data, fileName = "exportedProducts.json") => {
  try {
    // Konverter array til JSON-string med pæn formattering
    const jsonData = JSON.stringify(data, null, 2);

    // Skriv fil til disk
    fs.writeFileSync(path.resolve(fileName), jsonData, "utf-8");
    console.log(`Data gemt som ${fileName}`);
  } catch (error) {
    console.error(`Fejl ved export af JSON-fil: ${error.messsage}`);
  }
};

/**
 * Import-funktion som læser products.json og gemmer det som mongoImportProducts.json
 * Kan bruges til direkte import i MongoDB Compass
 */

const importData = () => {
  const products = readJSONFile("../../data/products.json"); // Læs fil fra data-mappen
  (exportToJSON = products), "mongoImportProducts.json"; // Gem som fil klar til MongoBD
};

// Eksportér funktioner, så de kan bruges i andre filer
module.exports = {
  readJSONFile,
  exportToJSON,
  importData,
};
