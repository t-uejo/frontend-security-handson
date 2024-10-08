const crypto = require("crypto");
const express = require("express");
const api = require("./routes/api");
const csrf = require("./routes/csrf");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use("/api", api);
app.use("/csrf", csrf);

app.get("/", (req, res, next) => {
    res.end("Top Page");
});

app.get("/csp", (req, res) => {
    const nonceValue = crypto.randomBytes(16).toString("base64");
    res.header("Content-Security-Policy", `script-src 'nonce-${nonceValue}'`);
    res.render("csp", { nonce: nonceValue });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});