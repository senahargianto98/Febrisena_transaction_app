const mysql = require('mysql2');

exports.getTransaction = async (req, res) => {
    try {
        console.log(req.params.menu)
        console.log(req.params.price);
        console.log(req.params.name);
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "transaction",
            password: "mypass123"
        });
        con.query(`SELECT transaction.id, transaction.customer_id, transaction.menu, transaction.price, transaction.qty, transaction.payment, transaction.total, transaction.created_at
        FROM transaction
        JOIN customer ON transaction.customer_id = customer.id
        WHERE transaction.menu LIKE '${req.params.menu}' OR transaction.price LIKE ${req.params.price} AND customer.name LIKE '${req.params.name}'
        ORDER BY transaction.created_at DESC, customer.name ASC;`, function (err, result) {
            if (err) throw err;
            return res.status(200).json({ "statusCode": 200, "data": result })
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "statusCode": 500, "message": error })
    }
}