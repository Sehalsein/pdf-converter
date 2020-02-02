const express = require("express");
const path = require("path");
const pdfConverter = require("./office-to-pdf");

const port = process.env.PORT || "3000";

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  res.status(200).send(await pdfConverter(req.body.fileData));
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
