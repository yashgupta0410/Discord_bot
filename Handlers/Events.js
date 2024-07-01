module.exports = (client) => {
    client.once('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('messageCreate', message => {
        console.log(`[${message.author.tag}]: ${message.content}`);
    });

    client.on('guildCreate', guild => {
        console.log(`Joined a new guild: ${guild.name}`);
    });

    // Add more event handlers as needed
};