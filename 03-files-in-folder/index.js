const fs = require("fs");
const path = require("path");

fs.readdir(
  `${path.dirname(__filename)}/secret-folder`,
  { withFileTypes: true },
  (err, data) => {
    if (err) console.error(err);
    else
      console.log(`*******Информация о файле*******
| Имя - Расширение - Вес(кб) |`) +
        data
          .filter((file) => file.isFile())
          .forEach((file) => {
            fs.stat(
              `${path.dirname(__filename)}/secret-folder/${file.name}`,
              function (err, stats) {
                if (err) {
                  return console.error(err);
                } else {
                  console.log(
                    `| ${file.name.split(".")[0]} - ${
                      path.extname(file.name).split(".")[1]
                    } - ${stats.size / 1000}kb |`
                  );
                }
              }
            );
          });
  }
);
