const env = require('../.env');
const api = require('./service/api');
const Telegraf = require('telegraf');
const sessionn = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { enter , leave } = Stage
const bot = new Telegraf(env.token);


bot.start(ctx => {
    const from =  ctx.update.message.from;
    ctx.reply(`Seja bem vindo ${from.name}`);
    ctx.reply(`Entre com /posicoes ou /comando para iniciar...`);
})


bot.startPolling();