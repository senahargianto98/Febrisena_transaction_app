const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

const transactionRoutes = require("../srcProducer/routes/transaction");
const producerRoutes = require("../srcProducer/routes/producer");

app.use(express.json());
app.use(cors());

app.use("/api/v1/", transactionRoutes, producerRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});