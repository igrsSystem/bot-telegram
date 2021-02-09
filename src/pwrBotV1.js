const env = require('../.env');
const Telegraf = require('telegraf');
const sessionn = require('telegraf/session');


const bot = new Telegraf(env.token);

let arr = []

const teste = (data) => {

    arr.map(item => {
        bot.telegram.sendMessage(item, data.teste)

        bot.telegram.sendDocument(item, 'https://pwrbot.s3-sa-east-1.amazonaws.com/uploads/pdf/0029598016db566f9e0bb29b256685fc.pdf')
    })


}
bot.start(ctx => {

    const from = ctx.update.message.from;

    const id_chat = ctx.update.message.chat

    console.log(id_chat.id)

    arr.push(id_chat.id)

    ctx.reply(`Seja bem vindo ${from.name} Aqui vc recebe noticações`);

})


bot.startPolling();

module.exports = { teste }