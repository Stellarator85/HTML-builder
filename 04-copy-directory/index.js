const fs = require("fs");
const path = require("path");
const fsPromises = require("fs").promises;

fs.mkdir("04-copy-directory/files-copy", { recursive: true }, (err) => {
  if (err) throw err; // не удалось создать папку
  console.log(`Folder "files-copy"was created!`);
});

fsPromises
  .copyFile(
    `04-copy-directory/files/test-css.css`,
    "04-copy-directory/files-copy/test-css.css"
  )
  .then(function () {
    console.log(`File "test-css.css" was copied!`);
  })
  .catch(function (error) {
    console.log(error);
  });

fsPromises
  .copyFile(
    `04-copy-directory/files/test-image.jpg`,
    "04-copy-directory/files-copy/test-image.jpg"
  )
  .then(function () {
    console.log(`File "test-image.jpg" was copied!`);
  })
  .catch(function (error) {
    console.log(error);
  });

fsPromises
  .copyFile(
    `04-copy-directory/files/test-js.js`,
    "04-copy-directory/files-copy/test-js.js"
  )
  .then(function () {
    console.log(`File "test-js.js" was copied!`);
  })
  .catch(function (error) {
    console.log(error);
  });

fsPromises
  .copyFile(
    `04-copy-directory/files/test-text.txt`,
    "04-copy-directory/files-copy/test-text.txt"
  )
  .then(function () {
    console.log(`File "test-text.txt" was copied!`);
  })
  .catch(function (error) {
    console.log(error);
  });
