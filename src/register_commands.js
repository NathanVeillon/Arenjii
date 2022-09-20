const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const config = require("../config.json");

const path = require( 'path' );
const fs = require( 'fs' );

// Adding command json data from each command in the commands folder
const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(config.token); // eslint-disable-line no-eval

(async () => {
    try {
        //Registering for specific guilds (servers) to make changes happen quicker
        //Useful for testing
        if(config.guild_ids){
            console.log('Started refreshing guild (/) commands.');

            for(let guild_id of config.guild_ids){
                await rest.put(Routes.applicationGuildCommands(config.application_id, guild_id), { body: commands });
            }


            console.log('Successfully reloaded guild (/) commands.');
        }


        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(config.application_id), { body: commands });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();