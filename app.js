const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const PORT= process.env.PORT|| 3000;
const app = express();

app.use("/", express.static("public"));
app.use(fileUpload());

app.post("/extract-text", (req, res) => {
    if (!req.files && !req.files.pdfFile) {
        res.status(400);
        res.end();
    }

    pdfParse(req.files.pdfFile).then(result => {
        const hindiText = extractHindi(result.text);
        res.send(hindiText);
    });
});

function extractHindi(text) {
    const hindiRegex = /[\u0900-\u097F]+/g;
    const hindiCharacters = text.match(hindiRegex) || [];
    const hindiText = hindiCharacters.join(" ");
    
    return hindiText;
}


app.listen(PORT);