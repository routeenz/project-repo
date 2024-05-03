const { VM } = require("vm2");

const executeJavaScript = async (code) => {
  try {
    console.log("Received code:", code); // Log the received code

    let capturedOutput = ""; // Variable to capture console.log output

    const vm = new VM({
      sandbox: {
        console: {
          log: (...args) => {
            capturedOutput += args.join(" ") + "\n"; // Append logged messages to capturedOutput
          },
        },
      },
    });

    // Execute the JavaScript code within the VM
    const result = vm.run(code);

    // Log the captured console output
    console.log("Execution result:", capturedOutput);

    // Return trimmed captured output
    return capturedOutput.trim();
  } catch (error) {
    console.error("Error executing JavaScript:", error);
    throw error;
  }
};

module.exports = {
  executeJavaScript,
};
