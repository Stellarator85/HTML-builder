const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

fsPromises
  .mkdir(
    `${path.dirname(__filename)}/project-dist`,
    { recursive: true },
    (err) => {
      if (err) throw err;
      else
        console.log(
          `---------------------------------------------------------------
   *** Folder "project-dist" was created/updated successfully! ***  
---------------------------------------------------------------`
        );
    }
  )
  .then(function () {
    console.log(
      `---------------------------------------------------------------
*** Folder "project-dist" was created/updated successfully! *** 
---------------------------------------------------------------`
    );
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(() =>
    fsPromises.copyFile(
      `${path.join(__dirname, "template.html")}`,
      `${path.join(__dirname, "./project-dist", "index.html")}`
    )
  )
  .catch(function (error) {
    console.log(error);
  })
  .then(
    () =>
      fs
        .createReadStream(
          `${path.join(__dirname, "./components", "header.html")}`,
          "utf8"
        )
        .on("data", function (chunk) {
          return (header = chunk);
        }) +
      fs
        .createReadStream(
          `${path.join(__dirname, "./components", "articles.html")}`,
          "utf8"
        )
        .on("data", function (chunkk) {
          return (articles = chunkk);
        }) +
      fs
        .createReadStream(
          `${path.join(__dirname, "./components", "footer.html")}`,
          "utf8"
        )
        .on("data", function (chunkkk) {
          return (footer = chunkkk);
        })
  )
  .catch(function (error) {
    console.log(error);
  })
  .then(() =>
    // копируем "header"
    fs
      .createReadStream(
        `${path.join(__dirname, "./project-dist", "index.html")}`,
        "utf8"
      )
      .on("data", function (chunk) {
        writeStr = fs.createWriteStream(
          `${path.join(__dirname, "./project-dist", "index.html")}`
        );
        writeStr.write(
          `${chunk.toString().replace(`{{header}}`, `${header}`)}`
        );
        writeStr.end();
        //* копируем "articles"
        fs.createReadStream(
          `${path.join(__dirname, "./project-dist", "index.html")}`,
          "utf8"
        ).on("data", function (chunks) {
          writeStr1 = fs.createWriteStream(
            `${path.join(__dirname, "./project-dist", "index.html")}`
          );
          writeStr1.write(
            `${chunks.toString().replace(`{{articles}}`, `${articles}`)}`
          );
          writeStr1.end();
          //* копируем "footer"
          fs.createReadStream(
            `${path.join(__dirname, "./project-dist", "index.html")}`,
            "utf8"
          ).on("data", function (chunkss) {
            writeStr2 = fs.createWriteStream(
              `${path.join(__dirname, "./project-dist", "index.html")}`
            );
            writeStr2.write(
              `${chunkss.toString().replace("{{footer}}", `${footer}`)}`
            );
            writeStr2.end();
          });
          console.log(`File "index.html" was created/updated successfully!`);
        });
      })
  )
  .catch(function (error) {
    console.log(error);
  });
