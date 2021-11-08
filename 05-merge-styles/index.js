const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

fs.readdir(`${path.dirname(__filename)}/styles`, function (error, files) {
  if (error) error;
  else if (
    !error &&
    files.filter((file) => path.extname(file) === ".css").length <= 0
  )
    console.log(`       • Файл "bundle.css" был успешно создан/обновлен! •`) +
      fsPromises.writeFile(
        `${path.join(__dirname, "./project-dist", "bundle.css")}`,
        ""
      );
  else
    console.log(`       • Файл "bundle.css" был успешно создан/обновлен! • 
/Все наявные в папке "styles" cтили будут помещены в этот файл:/`) +
      files
        .filter((file) => path.extname(file) === ".css")
        .forEach((file) =>
          fs.readFile(
            `${`${path.join(__dirname, "./styles", file)}`}`,
            "utf8",
            function (error, data) {
              if (error) console.log(error);
              else
                fsPromises
                  .writeFile(
                    `${path.join(__dirname, "./project-dist", "bundle.css")}`,
                    ""
                  )
                  .then(() =>
                    fs.appendFile(
                      `${path.join(__dirname, "./project-dist", "bundle.css")}`,
                      `${data}`,
                      function (err) {
                        if (err) {
                          console.log(err);
                        } else {
                          console.log(
                            `--> Стили файла "${file}" были добавлены в файл "bundle.css"`
                          );
                        }
                      }
                    )
                  );
            }
          )
        );
});
require("process").on("beforeExit", () => {
  console.log(
    `----------------------------------------------------------------
                             *****`
  );
});
