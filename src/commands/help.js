const {HelpMessage, HelpChoices} = require('../help.js');
const {SlashCommandBuilder} = require('discord.js')

const data = new SlashCommandBuilder()
    .setName("help")
    .setDescription("help")
    .addStringOption(option =>
        option.setName('command')
            .setDescription('the command you need clarification on')
            .setRequired(false)
            .addChoices(...HelpChoices)
    )
;

async function run(interaction){
    let commStr =  (interaction.options.getString("command")) ? interaction.options.getString("command").trim().toLowerCase() : null;
    let helpMsg = (HelpMessage.hasOwnProperty(commStr)) ? HelpMessage[commStr] : HelpMessage.default;

    await interaction.deferReply();

    await interaction.user.send(helpMsg);
    await interaction.followUp(`**${interaction.user.username} has queried the cosmos.**`);
}

module.exports = {
    data,
    run
}