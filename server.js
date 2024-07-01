const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');
const weather = require('weather-js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.commands = new Collection();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.reply('Pong!');
    } else if (command === 'weather') {
        if (!args.length) {
            return message.reply('Please provide a location. Usage: +weather <city>');
        }
        const location = args.join(' ');
        weather.find({search: location, degreeType: 'C'}, function(err, result) {
            if(err) {
                console.error(err);
                return message.reply('Error fetching weather data.');
            }
            if(!result || !result.length) {
                return message.reply('Location not found.');
            }
            const current = result[0].current;
            const location = result[0].location;
            message.reply(`Current weather in ${location.name}:\nTemperature: ${current.temperature}°C\nSky: ${current.skytext}\nHumidity: ${current.humidity}%`);
        });
    }
});

client.login(process.env.TOKEN);