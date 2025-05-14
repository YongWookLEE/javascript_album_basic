const express = require("express");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "..")));

app.get("/:wildcard", (req, res) => {
  console.log(req.params);
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`START SERVER at http://localhost:${PORT}`);
});
