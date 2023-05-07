const express = require("express");
const router = express.Router();
const { postTransaction } = require("../controller/producer")

router.post("/add/transaction", postTransaction);

module.exports = router;