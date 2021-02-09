const amqp = require('amqplib/callback_api');
const { teste } = require('./pwrBotV1');
const url = ''

amqp.connect(url, function (err, conn) {

    if (err)
        return console.log("RabbitMQ não conectado: " + err);




    conn.createChannel(async (err, ch) => {
        if (err)
            return console.log(err)

        let q = 'notify_telegram';

        ch.prefetch(1);

        ch.assertQueue(q, { durable: true });

        ch.consume(q.queue, async (msg) => {

            const obj = JSON.parse(msg.content.toString())

            console.log(obj)

            teste(obj)

            setTimeout(() => {
                ch.ack(msg)
            }, 10000)


        });

    });

})
