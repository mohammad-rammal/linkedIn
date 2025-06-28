const { exec } = require("child_process");

const runCommand = (command) => {
  const process = exec(command);
  process.stdout.on("data", (data) => console.log(data));
  process.stderr.on("data", (data) => console.error(data));
};

runCommand("npm start --prefix ../backend");
runCommand("npm run dev --prefix ../frontend");
