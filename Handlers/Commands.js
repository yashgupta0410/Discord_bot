const fs = require('fs');
const { Collection } = require('discord.js');
const config = require('../config.js');

module.exports = (client) => {
    client.commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
        const command = require(`../commands/${file}`);
        if (command.name) {
            client.commands.set(command.name, command);
        } else {
            console.error(`Invalid command file ${file}, missing name.`);
        }
    }

    client.on('messageCreate', async message => {
        if (!message.content.startsWith(config.prefix) || message.author.bot) return;

        const args = message.content.slice(config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try {
            await command.run(client, message, args);
        } catch (error) {
            console.error(`Error executing command ${command.name}:`, error);
            message.reply('There was an error trying to execute that command!');
        }
    });
};
