const { EmbedBuilder } = require('discord.js');
const weather = require('weather-js');

module.exports = {
  name: 'weather',
  description: 'Get some city weather forecast/information',
  usage: '',
  aliases: [],
  permission: [],
  cooldown: 3000,
  run: async (client, message, args) => {
    let city = args.join(' ');
    if (!city) {
      return message.reply("Which city's weather info do you want?");
    }

    weather({ search: city, degreeType: 'F' }, (error, result) => {
      if (error) return message.reply('Something went wrong :(');
      if (result.length === 0) {
        return message.reply("We couldn't find this city's info, please provide another city!");
      }

      let data = result[0];
      let time = `${data.current.date}, ${data.current.observationtime}`;

      const embed = new EmbedBuilder()
        .setAuthor({ name: 'Weather Forecast', iconURL: data.current.imageUrl })
        .setColor('Random')
        .setThumbnail(data.current.imageUrl)
        .addFields(
          { name: 'City', value: data.location.name, inline: true },
          { name: 'Sky Condition', value: data.current.skytext, inline: true },
          { name: 'Temperature', value: data.current.temperature.toString(), inline: true },
          { name: 'Wind Speed', value: data.current.windspeed, inline: true },
          { name: 'TimeZone', value: data.location.timezone, inline: true },
          { name: 'Day', value: data.current.day, inline: true }
        )
        .setFooter({ text: time });

      return message.reply({ embeds: [embed] });
    });
  },
};