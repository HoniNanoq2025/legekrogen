const fs = require("fs"); // Fil-system modul til at læse og skrive filer
const path = require("path"); // Modul til håndtering af filstier

/**
 * Læs JSON-fil og returnér array af produkter
 * @param {string} filePath - relativ sti til JSON-fil
 * @returns {Array} - array med produkter
 */

const importProducts = () => {
  try {
    // Konvertér relativ sti til absolut sti
    const fullPath = path.resolve(__dirname, "../../data/products.json");
    // Læs fil som tekst
    const data = fs.readFileSync(fullPath, "utf-8");
    // Konvertér tekst til Javascript objekt
    return JSON.parse(data);
  } catch (err) {
    console.error(`Fejl ved læsning af JSON-fil: ${err.message}`);
    return [];
  }
};

/**
 * Gem et array som JSON-fil (kan importeres til MongoDB Compass)
 * @param {Array} data - array med produkter
 * @param {string} fileName - output filnavn
 */

const exportToJSON = (data, fileName = "mongoImportProducts.json") => {
  try {
    // Konvertér array til JSON-string med pæn formattering
    const jsonData = JSON.stringify(data, null, 2);
    // Skriv til disk
    fs.writeFileSync(path.resolve(fileName), jsonData, "utf-8");
    console.log(`Data gemt som ${fileName}`);
  } catch (err) {
    console.error(`Fejl ved eksport af JSON-fil: ${err.message}`);
  }
};

module.exports = { importProducts, exportToJSON };
