const fs = require("fs");
const path = require("path");

function generateFileTree(dirPath, prefix = "") {
  const files = fs.readdirSync(dirPath);

  files.forEach((file, index) => {
    if (file !== "node_modules") {
      // Skip the "node_modules" folder
      const filePath = path.join(dirPath, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const isLast = index === files.length - 1;
      const prefixConnector = isLast ? "└── " : "├── ";

      console.log(prefix + prefixConnector + file);

      if (isDirectory) {
        const nestedPrefix = prefix + (isLast ? "    " : "│   ");
        generateFileTree(filePath, nestedPrefix);
      }
    }
  });
}

const rootPath = path.join(__dirname);
generateFileTree(rootPath);
