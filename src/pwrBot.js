const Telegraf = require('telegraf');
const env =  require('../.env');
const api = require('./service/api')
const bot = new Telegraf(env.token);

bot.start(ctx => {
    const from =  ctx.update.message.from;
   // console.log(from)
    ctx.reply(`Seja Bem Vindo ${from.first_name}! Por gentileza digite o SERIAL DO EQUIPAMENTO`)
})

bot.on('text',  async ctx =>{
    const resp = ctx.message.text;  
    var numero = parseInt(resp)
    console.log(resp)
    if(Number.isInteger(numero)){
        const rest = await api.get(`pwr/${numero}`)
        console.log(rest.data)
        if(rest.data == ''){
            ctx.reply(`Equipamento não encotrado`);
        }else{
            const dat = rest.data[0]
            ctx.reply(`Equipamento: ${dat.eqpt_serial}`)
            ctx.reply(`Dh GPS: ${dat.dh_gps} / Dh Registro: ${ dat.dh_insert }`)
            ctx.reply(`Latitude: ${dat.latitude} / Longitude: ${ dat.longitude }`)
            ctx.replyWithLocation( dat.latitude, dat.longitude )
            ctx.reply(`Endereço de Transmissão: ${dat.address_description}`)
            if(dat.ignition == true){
                var ign = 'Ligada'
            }else{
                var ign = 'Desligada'
            }
           
            if(dat.panic == true){
                var pnc = "ativo"
            }else{
                var pnc = "Desativado"
            }
            ctx.reply(`Ignição: ${ign} / Panico: ${pnc}` );
        } 
    }else{
       ctx.reply(`Atenção e valido digitar apenas numeros`);
       //teste de branch
    }
    
    
}) 

bot.startPolling();