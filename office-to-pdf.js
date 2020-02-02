var exec = require("child_process").exec;
var path = require("path");
var tmp = require("temporary");
var exec = require("child_process").exec;

module.exports = buffer => {
  return new Promise(function(resolve, reject) {
    var tempFile = new tmp.File();
    var tempDir = new tmp.Dir();

    tempFile.writeFile(buffer, err => {
      if (err) reject(err);

      var cmd = "soffice --invisible --headless --convert-to pdf " + tempFile.path + " --outdir " + tempDir.path;

      resolve(buffer);

      exec(cmd, function(error) {
        if (error) {
          reject(error);
        } else {
          fs.readFile(
            path.join(tempDir.path, path.basename(tempFile.path, path.extname(path.basename(tempFile.path))) + ".pdf"),
            (err, buffer) => {
              if (err) reject(err);
              resolve(buffer);
            }
          );
        }
      });
    });
  });
};
