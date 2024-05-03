const express = require("express");
const cors = require("cors");
const { executeCpp } = require("./executeCpp");
const { executePython } = require("./executePython");
const { executeJavaScript } = require("./executeJs");
const { generateFile } = require("./generateFile");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoint to run code and save to a file
app.post("/run", async (req, res) => {
  try {
    const { language, code } = req.body;

    if (!language || !code) {
      return res
        .status(400)
        .json({ success: false, error: "Language and code are required." });
    }

    // Execute code based on language
    let output;
    switch (language) {
      case "cpp":
        output = await executeCpp(code);
        break;
      case "python":
        output = await executePython(code);
        break;
      case "javascript":
        output = await executeJavaScript(code);
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: "Unsupported language" });
    }

    // Save code to a file
    const filepath = await generateFile(language, code);

    console.log("Output:", output);
    console.log("File saved to:", filepath);

    return res.json({ success: true, output, filepath });
  } catch (error) {
    console.error("Error in /run endpoint:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
