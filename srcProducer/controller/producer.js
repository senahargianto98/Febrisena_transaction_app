const amqp = require('amqplib')     // Import library amqp

exports.postTransaction = async (req, res) => {
    try {
        amqp.connect('amqp://localhost')
            .then(conn => {
                return conn.createChannel().then(ch => {
                    const array = req.body
                    const queue2 = ch.assertQueue('queue2', { durable: false })
                    ch.sendToQueue('queue2', Buffer.from(JSON.stringify(array)))
                    console.log('- Sent', array)
                }).finally(() => {
                    setTimeout(function () { conn.close(); }, 500);
                })
            }).catch(console.warn)
        return res.status(200).json({ "statusCode": 200, "message": "Success" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ "statusCode": 500, "message": error })
    }
}
