import fs from 'fs';
import xml2js from 'xml2js';

const inputFile = './src/assets/icons/sprite.svg';
const outputFile = inputFile;

fs.readFile(inputFile, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  xml2js.parseString(data, (err, result) => {
    if (err) {
      console.error('Error parsing the SVG:', err);
      return;
    }

    const updateFillAttributes = (element) => {
      if (element.$ && element.$.fill) {
        element.$.fill = 'inherit';
      }
      if (element.$$) {
        element.$$.forEach((child) => updateFillAttributes(child));
      }
    };

    if (result.svg && result.svg.symbol) {
      result.svg.symbol.forEach((symbol) => {
        if (symbol.path) {
          symbol.path.forEach((path) => updateFillAttributes(path));
        }
      });
    }

    const builder = new xml2js.Builder();
    const updatedSvg = builder.buildObject(result);

    fs.writeFile(outputFile, updatedSvg, (err) => {
      if (err) {
        console.error('Error writing the file:', err);
        return;
      }
      console.log(
        `SVG file processed successfully. Output saved to ${outputFile}`,
      );
    });
  });
});
