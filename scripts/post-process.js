import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

const inputDir = './src/assets/icons/svgs';
const skipFiles = ['logo.svg', 'logo-no-color.svg'];

const processSvgFile = (filePath) => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading the file ${filePath}:`, err);
      return;
    }

    xml2js.parseString(data, (err, result) => {
      if (err) {
        console.error(`Error parsing the SVG ${filePath}:`, err);
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

      if (result.svg) {
        if (result.svg.symbol) {
          result.svg.symbol.forEach((symbol) => {
            if (symbol.path) {
              symbol.path.forEach((path) => updateFillAttributes(path));
            }
          });
        }
        if (result.svg.path) {
          result.svg.path.forEach((path) => updateFillAttributes(path));
        }
      }

      const builder = new xml2js.Builder();
      const updatedSvg = builder.buildObject(result);

      fs.writeFile(filePath, updatedSvg, (err) => {
        if (err) {
          console.error(`Error writing the file ${filePath}:`, err);
          return;
        }
        console.log(`SVG file processed successfully: ${filePath}`);
      });
    });
  });
};

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading the directory:', err);
    return;
  }

  const svgFiles = files.filter(
    (file) => path.extname(file).toLowerCase() === '.svg',
  );

  if (svgFiles.length === 0) {
    console.log('No SVG files found in the directory.');
    return;
  }

  svgFiles.forEach((file) => {
    const filePath = path.join(inputDir, file);
    if (skipFiles.some((file) => filePath.includes(file))) {
      console.log(`Skip reading the file ${filePath}:`);
      return;
    }
    processSvgFile(filePath);
  });
});
