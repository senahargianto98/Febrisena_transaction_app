const amqp = require('amqplib') // Import library amqp
const mysql = require('mysql2');
const crypto = require('crypto')

const insertData = async (json_data) => {
    try {
        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "transaction",
            password: "mypass123"
        });
        con.query(`INSERT INTO transaction (id, customer_id, menu, price, qty, payment, total) VALUES ("${crypto.randomUUID()}", "${json_data.customer_id}", "${json_data.menu}", ${json_data.price}, ${json_data.qty}, "${json_data.payment}", ${json_data.total});`);
    } catch (error) {
        console.log(error);
    }
}

amqp.connect('amqp://localhost')
    .then(conn => {
        return conn.createChannel().then(ch => {
            const queue2 = ch.assertQueue('queue2', { durable: false })      // Deklarasi antrian
            if (queue2) {
                queue2.then(() => {
                    return ch.consume('queue2', msg => {
                        let json_data = JSON.parse(msg.content.toString());
                        insertData(json_data)
                    }, { noAck: true })
                })
                    .then(() => {
                        console.log('* Waiting for messages. Ctrl+C to exit')
                    })
            }

        })
    }).catch(console.warn)