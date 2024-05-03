const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeCpp = async (code) => {
  const cppFilePath = path.join(outputPath, "main.cpp");

  try {
    // Write the C++ code to a file
    await fs.promises.writeFile(cppFilePath, code);

    // Compile the C++ code
    const exeFilePath = path.join(outputPath, "main.exe");
    const command = `g++ "${cppFilePath}" -o "${exeFilePath}"`;

    // Execute the compilation command
    await execPromise(command);

    // Execute the compiled program and capture the output
    const output = await execPromise(`"${exeFilePath}"`);
    return output;
  } catch (error) {
    console.error("Error executing C++ code:", error);
    throw error;
  }
};

const execPromise = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

module.exports = {
  executeCpp,
};
