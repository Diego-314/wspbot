const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.get(["/", "/:name"], (req, res) => {
  greeting = "<h1>Hello From Node on Fly!</h1>";
  name = req.params["name"];
  if (name) {
    res.send(greeting + "</br>and hello to " + name);
  } else {
    res.send(greeting);
  }
});

app.listen(port, () => console.log(`Aplicación ejecutandose en el puerto ${port}!`));










const fs = require('fs');
const { Client, LocalAuth, MessageMedia, Chat } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Path where the session data will be stored
const SESSION_FILE_PATH = './Session_Storage/MANIFEST-000001';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    authStrategy: new LocalAuth({
        session: sessionData
    })
});

client.on('qr', qr => {
    qrcode.generate(qr, {medium: true});
});

client.on('ready', () => {
    console.log('El cliente está listo.')
})


client.initialize();

let prefix = '!'
let img = MessageMedia.fromFilePath('./img/a.jpeg');
let messi = MessageMedia.fromFilePath('./img/messi.jpg');
let kun = MessageMedia.fromFilePath('./img/kun.jpg')
let ataud = MessageMedia.fromFilePath('./img/ataud.jpg')
let wooh = MessageMedia.fromFilePath('./img/wooh.gif')

client.on('message', async message => {
    const args = message.body.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const commandMinus = message.body.toLowerCase()
    if (command === 'flauta') {
        message.reply('¿Querés ver mi flauta?')
        client.sendMessage(message.from, img)
    }
    if (command === 'oink') {
        message.reply('Tres chanchitos desobedientes')
        message.reply('Sin permiso de la mamá')
        message.reply('Se tomaron de las manos')
        message.reply('Y se fueron a pasear')
        message.reply('Vino el lobo y se comió')
        message.reply('Al chanchito regalón')
        message.reply('De un mordisco le sacó')
        message.reply('La colita de un tirón')
        message.reply('Tilín, tilón, colita de ratón')
        message.reply('Tres chanchitos desobedientes')
        message.reply('Sin permiso de la mamá')
        message.reply('Se tomaron de las manos')
        message.reply('Y se fueron a pasear')
        message.reply('Vino el lobo y se comió')
        message.reply('Al chanchito regalón')
        message.reply('De un mordisco le sacó')
        message.reply('La colita de un tirón')
        message.reply('Tilín, tilón, colita de ratón')

    }
    if (command === 'messi') {
        message.reply('Enviando foto de Messi-sama...')
        await client.sendMessage(message.from, messi)
        client.sendMessage(message.from, 'Qué lindo es Messi >///<')
    }
    if (command === 'abuela') {
        message.reply('Localizando a tu abuela...')
        client.sendMessage(message.from, 'Abuela encontrada')
        await client.sendMessage(message.from, ataud)
        client.sendMessage(message.from, 'Jaja, ahí está tu abuela')
    }
    if (command === 'info') {
        let contact = Chat.getContact()
        console.log(contact)
        console.log(contact.name, contact.id)

    }
    if (command === 'drama') {
        client.sendMessage(message.from, 'Messi: Hola Kuncito, ¿Cómo estás?')
        client.sendMessage(message.from, 'Kun: Nada de hola, Messi. Ya no quiero hablar con vos')
        client.sendMessage(message.from, 'Messi: ¿Por qué? ¿Qué hice para que me digas esto?')
        client.sendMessage(message.from, 'Kun: No te hagas el estúpido. Ya sabes que es lo que me molesta')
        client.sendMessage(message.from, 'Messi: Por favor, Kun. Ya te pedí perdón')
        client.sendMessage(message.from, 'Kun: Las disculpas no tienen sentido cuando la amistad ya está rota')
        await client.sendMessage(message.from, kun)
        client.sendMessage(message.from, 'Messi: ¡Perdón, Kun!')
        client.sendMessage(message.from, 'Kun: No te perdonaré esto jamás, Messi.')
        client.sendMessage(message.from, '_*Descubre que sucede entre Messi y Kun en el próximo capítulo...*_')
    }
    if (command === 'help') {
        message.reply('Los comandos disponibles son...')
        client.sendMessage(message.from, '*!help* === Envía una lista con todos los comandos')
        client.sendMessage(message.from, '*!flauta* === Envía una imagen de mi flauta')
        client.sendMessage(message.from, '*!oink* === Envía la canción de los tres chanchitos')
        client.sendMessage(message.from, '*!messi* === Envía una foto de messi')
        client.sendMessage(message.from, '*!drama* === Crea la mejor novel que podrás ver jamás')
        client.sendMessage(message.from, '*!abuela* === Te muestra donde está tu abuela')
        client.sendMessage(message.from, '*!everyone* === Etiqueta a todos los participantes de un grupo')
    }
    if (commandMinus === 'que') {
        message.reply('SOOOOOOOOO')
        client.sendMessage(message.from, wooh)
    }
    if (command === 'sticker') {
        if (message.hasMedia) {
            let media = await message.downloadMedia()
            client.sendMessage(message.from, media, {sendMediaAsSticker: true})
        } else {
            message.reply('Ha habido un error.')
        }
    }
    if(command === 'everyone') {
        const chat = await message.getChat();
        
        let text = "";
        let mentions = [];

        for(let participant of chat.participants) {
            const contact = await client.getContactById(participant.id._serialized);
            
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        await chat.sendMessage(text, { mentions });
    }
});


 

 
