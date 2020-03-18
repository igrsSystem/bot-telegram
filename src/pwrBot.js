const Telegraf = require('telegraf');
const env =  require('../.env');
const api = require('./service/api')
const bot = new Telegraf(env.token);
const session = require('telegraf/session');
const Stage = require('telegraf/stage');
const Scene = require('telegraf/scenes/base');

const { enter , leave } = Stage



bot.start(ctx => {
    const from =  ctx.update.message.from;
    ctx.reply(`Seja bem vindo ${from.first_name}`);
    ctx.reply(`Entre com /posicoes ou /comando para iniciar...`);
})

const posiScene = new Scene('posi');
posiScene.enter(ctx =>  ctx.reply('Voce esta na area de ver posições'))
posiScene.leave(ctx => ctx.reply('você voltou a pagina inicial'))
posiScene.command('sair' , leave())

posiScene.on( 'text',  async ctx =>{
    const respp = ctx.message.text;  
    var numero = parseInt(respp)
    console.log(respp)
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

posiScene.on('message' , ctx => ctx.reply('Apenas mensagens de texto'))

const comdScene = new Scene('comd');
comdScene.enter(ctx =>  ctx.reply('Voce esta na area de ver comando'))
comdScene.leave(ctx => ctx.reply('você voltou a pagina inicial'))
comdScene.command('sair' , leave())
comdScene.on('text' , ctx => ctx.reply(ctx.message.text))
comdScene.on('message' , ctx => ctx.reply('Apenas mensagens de texto'))

const stage = new Stage([ posiScene , comdScene ]);
bot.use(session())
bot.use(stage.middleware())
bot.command('posicoes', enter('posi'))
bot.command('comando', enter('comd'))

comdScene.on('message' , ctx => ctx.reply('Entre com /posicoes ou /comando para iniciar'))

/*
bot.start(ctx => {
    const from =  ctx.update.message.from;
   // console.log(from)
    ctx.reply(`Seja Bem Vindo ${from.first_name}! Por gentileza digite /opcoes `)
})

bot.command('opcoes' , ctx => ctx.reply('/opcoes => Abaixo contem opções eu vc pode selecionar'
                        +'\n/posicoes: Ver posição eqpt'
                        +'\n/comando: Enviar comando'
                        +'\n/teste: Enviar teste'
));
bot.hears('/teste',ctx => {
    ctx.reply('Você esta na area de comando escolha um do comando');
    bot.on('text2', ctx => {
        const resp = ctx.message.text2;
        ctx.reply(`Texto do comando ${resp}`)
    })
})

bot.hears('/posicoes', ctx => {
    ctx.reply('Digite o SERIAL do equipamento');
    bot.on('text',  async ctx =>{
        const respp = ctx.message.text;  
        var numero = parseInt(respp)
        console.log(respp)
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
    
}) */
/*
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
    
    
}) */

bot.startPolling();