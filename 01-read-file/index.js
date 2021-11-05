const fs = require("fs");

const readableStream = fs.createReadStream("01-read-file/text.txt", "utf8");
readableStream.on("data", function (text) {
  console.log(text);
});
