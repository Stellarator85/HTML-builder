const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const copyDir = (() =>
  fs.readdir(`${path.dirname(__filename)}/files`, function (error, files) {
    if (error) error;
    else
      fs.mkdir(
        `${path.dirname(__filename)}/files-copy`,
        { recursive: true },
        (err) => {
          if (err) throw err;
          else
            console.log(
              `Folder "files-copy" was created/updated successfully!`
            );
        }
      ) +
        files.forEach((file) =>
          fsPromises
            .copyFile(
              `${path.join(__dirname, "./files", file)}`,
              `${path.join(__dirname, "./files-copy", file)}`
            )
            .then(function () {
              console.log(`File "${file}" was copied to "files-copy"-folder!`);
            })
            .catch(function (error) {
              console.log(error);
            })
        );
  }))();
