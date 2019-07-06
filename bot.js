const Discord = require("discord.js");
const bot = new Discord.Client()
const request = require('request');
const channelid = "597172073374285824";
const refresh = 10;
const maxPlayers = '32';
const wyspaName = '?? Osoby na wyspie:';
const token = "NTk3MTY4MjM2NDk2NDIwODY1.XSEKTA.zQO58paUmH4WqD7ytJm6eYlaU9Y";
const wyspaIp = "87.98.178.34:30120";
const wyspaOff = "??Wyspa OFF"

bot.on('ready', async () => {
    console.log("Zalogowano");
    setInterval(async () => {
        const channel = bot.channels.find('id', channelid);
        if (channel) {
            await request(`http://${wyspaIp}/info.json`, async (error) => {
                if (error) {
                    channel.setName(wyspaOff);
                    bot.user.setActivity(wyspaOff, {
                        type: 'WATCHING',
                    });
                } else {
                    await request(`http://${wyspaIp}/players.json`, async (error, response, playerss) => {
                        let players = JSON.parse(playerss);
                        channel.setName(`${wyspaName}: ${players.length}-${maxPlayers}`);
                        bot.user.setActivity(`${players.length}/${maxPlayers} graczy`, {
                            type: 'PLAYING',
                        });
                    });
                }
            });
        } else {
            console.log(`Nie znaleziono kanaĹ‚u ${channelid}`);
        }
    }, refresh * 1000);
});

bot.login(token);