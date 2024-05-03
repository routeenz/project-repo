const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

// Ensure that the codes directory exists
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

/**
 * Generate a file based on the specified language and content.
 * @param {string} language - The programming language (e.g., "cpp", "python", "javascript").
 * @param {string} content - The content of the file to be generated.
 * @returns {Promise<string>} - Resolves with the filepath of the generated file.
 */
const generateFile = async (language, content) => {
  const jobId = generateJobId(language);
  const filename = `${jobId}.${getFileExtension(language)}`;
  const filepath = path.join(dirCodes, filename);

  try {
    if (
      language === "cpp" ||
      language === "python" ||
      language === "javascript"
    ) {
      await fs.promises.writeFile(filepath, content);
    } else {
      throw new Error(`Unsupported language: ${language}`);
    }

    return filepath;
  } catch (error) {
    console.error(`Error writing file ${filepath}:`, error);
    throw error; // Propagate the error for handling upstream
  }
};

const generateJobId = (language) => {
  const prefix = getPrefixForLanguage(language);
  return `${prefix}-${uuidv4().replace(/-/g, "")}`;
};

const getPrefixForLanguage = (language) => {
  switch (language) {
    case "cpp":
      return "cpp";
    case "python":
      return "py";
    case "javascript":
      return "js";
    default:
      return "unknown";
  }
};

const getFileExtension = (language) => {
  switch (language) {
    case "cpp":
      return "cpp";
    case "python":
      return "py";
    case "javascript":
      return "js";
    default:
      return ""; // Handle unrecognized languages gracefully
  }
};

module.exports = {
  generateFile,
};
