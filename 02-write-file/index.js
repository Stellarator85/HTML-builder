const fs = require("fs");

const writeableStream = fs.createWriteStream(
  "02-write-file/processing-file.txt"
);

const readline = require("readline").createInterface(
  process.stdin,
  process.stdout
);

readline.question(
  `Здравствуйте ув.проверяющий!
Текстовый файл("processing-file") в папке "02-write-file" был создан!
Введите, пожалуйста, любой текст и нажмите 'Enter' чтобы добавить текст в файл.
Если Вы хотите завершить процесс введите "exit" или нажмите "CTRL + C". \r\n`,
  function (text) {
    if (text.toLowerCase() === "exit")
      return writeableStream.end + readline.close();
    else
      return (
        writeableStream.write(`${text}`) +
        console.log(`Введенный Вами текст("${text}") был добавлен в файл "processing-file.txt".
Вы можете продолжить вводить и добавлять текст в файл. 
Если Вы хотите завершить процесс введите "exit" или нажмите "CTRL + C".`) +
        readline.resume()
      );
  }
);

readline.on("line", (text) => {
  if (text.toLowerCase() === "exit")
    return writeableStream.end + readline.close();
  else
    return (
      writeableStream.write(`${text}`) +
      console.log(`Введенный Вами текст("${text}") был добавлен в файл "processing-file.txt".
Вы можете продолжить вводить и добавлять текст в файл. 
Если Вы хотите завершить процесс введите "exit" или нажмите "CTRL + C".`) +
      readline.resume()
    );
});

const processs = require("process");

processs.on("beforeExit", () => {
  console.log(
    `Введенный Вами текст был сохранен.
Сеанс окончен. 
До свидания.`
  );
});
