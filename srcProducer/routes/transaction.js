const express = require("express");
const router = express.Router();
const { getTransaction } = require("../controller/transaction")

router.get("/get/transaction/:menu/:price/:name", getTransaction);

module.exports = router;