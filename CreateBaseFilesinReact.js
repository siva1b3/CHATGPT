const fs = require("fs");
const path = require("path");

const foldername = __dirname.split(path.sep).pop(); // Get the current folder name
const capitalizedFoldername = foldername.charAt(0).toUpperCase() + foldername.slice(1);
// Capitalize the first letter

const jsContent = `/* eslint-disable import/prefer-default-export */
export { default as ${capitalizedFoldername} } from "./${capitalizedFoldername}";
`;

const jsxContent = `import React from "react";
import "./styles/${foldername}.css";

function ${capitalizedFoldername}() {
  return <h3>${capitalizedFoldername}</h3>;
}

export default ${capitalizedFoldername};
`;

const cssContent = ""; // Empty content for CSS file

const jsFilePath = path.join(__dirname, "index.js");
const cssFilePath = path.join(__dirname, "styles", `${foldername}.css`);
const additionalJsFilePath = path.join(__dirname, `${capitalizedFoldername}.jsx`); // Path for the additional JS file

// Write content to index.js
fs.writeFile(jsFilePath, jsContent, (err) => {
  if (err) {
    console.error("Error writing to index.js:", err);
  } else {
    console.log("index.js created successfully.");
  }
});

// Create styles folder and write content to foldername.css
fs.mkdir(path.join(__dirname, "styles"), (err) => {
  if (err && err.code !== "EEXIST") {
    console.error("Error creating styles folder:", err);
  } else {
    fs.writeFile(cssFilePath, cssContent, (err01) => {
      if (err01) {
        console.error("Error writing to foldername.css:", err01);
      } else {
        console.log("foldername.css created successfully.");
      }
    });
  }
});

// Write content to ${capitalizedFoldername}.js
fs.writeFile(additionalJsFilePath, jsxContent, (err02) => {
  if (err02) {
    console.error("Error writing to additional JS file:", err02);
  } else {
    console.log(`${capitalizedFoldername}.js created successfully.`);
  }
});
