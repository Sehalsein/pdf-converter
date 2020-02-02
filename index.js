const express = require("express");
var fs = require("fs");

const pdfConverter = require("./office-to-pdf");

const port = process.env.PORT || "3000";

const app = express();
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.post("/", async (req, res) => {
  var file = new Buffer(req.body.fileData, "base64");
  var fileBuffer = await pdfConverter(file);
  fs.writeFileSync("./temp.pdf", fileBuffer);
  res.status(200).send("It Works");
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});
