const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const copyDir = (() =>
  fsPromises
    .mkdir(
      `${path.dirname(__filename)}/files-copy`,
      { recursive: true },
      (err) => {
        if (err) throw err;
        else
          console.log(
            `-------------------------------------------------------------
*** Folder "files-copy" was created/updated successfully! ***
-------------------------------------------------------------`
          );
      }
    )
    .then(function () {
      console.log(
        `-------------------------------------------------------------
*** Folder "files-copy" was created/updated successfully! ***
-------------------------------------------------------------`
      );
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      fs.readdir(
        `${path.dirname(__filename)}/files-copy`,
        function (error, oldfiles) {
          if (error) error;
          else if (!error && oldfiles.length === 0) return;
          else
            oldfiles.forEach((oldfile) =>
              fs.unlink(
                `${path.join(__dirname, "./files-copy", oldfile)}`,
                (err) => {
                  if (err) throw err; // не удалось удалить файл
                }
              )
            );
        }
      );
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      fs.readdir(
        `${path.dirname(__filename)}/files`,
        function (error, newfiles) {
          if (error) error;
          else
            newfiles.forEach((newfile) =>
              fsPromises
                .copyFile(
                  `${path.join(__dirname, "./files", newfile)}`,
                  `${path.join(__dirname, "./files-copy", newfile)}`
                )
                .then(function () {
                  console.log(
                    `---File "${newfile}" was copied to the "files-copy"-folder!---`
                  );
                })
                .catch(function (error) {
                  console.log(error);
                })
            );
        }
      );
    }))();
