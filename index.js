const express = require("express");
var fs = require("fs");

const pdfConverter = require("./office-to-pdf");

const port = process.env.PORT || "3000";

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.post("/", async (req, res) => {
  let base64Image = req.body.fileData.split(";base64,").pop();
  let file = new Buffer(base64Image, "base64");
  let fileBuffer = await pdfConverter(file);
  let converterBase64Image = "data:application/pdf;base64," + new Buffer(fileBuffer).toString("base64");
  res.status(200).json({ fileData: converterBase64Image });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
