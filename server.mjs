import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import open from "open";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies

app.post("/api-call", async (req, res) => {
  const {
    messages,
    max_tokens,
    temperature,
    frequency_penalty,
    presence_penalty,
    top_p,
    stop,
  } = req.body;

  const requestBody = {
    messages,
    max_tokens,
    temperature,
    frequency_penalty,
    presence_penalty,
    top_p,
    stop,
  };

  const response = await fetch(process.env.API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.OPENAI_API_KEY,
    },
    body: JSON.stringify(requestBody),
  });

  const responseData = await response.json();
  res.send(responseData);
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "index.html");
  let indexContent = fs.readFileSync(indexPath, "utf-8");
  indexContent = indexContent.replace(
    "TINYMCE_API_KEY",
    process.env.TINYMCE_API_KEY
  );
  indexContent = indexContent.replace(
    "OPENAI_API_KEY",
    process.env.OPENAI_API_KEY
  );
  res.send(indexContent);
});

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  open("http://localhost:3000", { app: "google chrome" });
});
