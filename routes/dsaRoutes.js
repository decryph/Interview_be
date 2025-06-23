const express = require("express");
const router = express.Router();
const { generateQuestion, submitCode, compileCode, getHistory } = require("../controllers/dsacontroller");

router.post("/generate-question", generateQuestion);
router.post("/submit-code", submitCode);
router.post("/compile-code", compileCode);
router.get("/history",authMiddleware, getHistory);

console.log("generateQuestion:", typeof exports.generateQuestion);
console.log("submitCode:", typeof exports.submitCode);
console.log("compileCode:", typeof exports.compileCode);
console.log("getHistory:", typeof exports.getHistory);


module.exports = router;
