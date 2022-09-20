const {DicePool} = require('../dice.js');
const {SlashCommandBuilder} = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("roll")
    .setDescription("roll a pool of burning wheel dice.")
    .addStringOption(option =>
        option.setName('base_dice')
            .setDescription('the command you need clarification on')
            .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("flags")
            .setDescription("add your modifiers here like fk for number of FoRKs")
            .setRequired(false)
    )
;

async function run(interaction) {
    let baseDice = interaction.options.getString("base_dice").toLowerCase().trim();
    let flags = interaction.options.getString("flags");

    if(flags){
        flags = flags.toLowerCase().trim().split(/\s+/g);
    }else{
        flags = [];

        //handle if flags are included in baseDice option
        let split = baseDice.split(/\s+/g);
        baseDice = split.shift();
        flags = split;
    }

    if(!DicePool.rollPattern.test(baseDice)){
        await interaction.reply(`Invalid roll pattern \`${baseDice}\` given, unable to roll the dice.`);
        return
    }

    let dicePool = new DicePool();
    dicePool.owner = interaction.user.username;
    dicePool.constructDiceProfile(baseDice, flags);

    dicePool.roll();

    await interaction.reply(dicePool.printPool());
}


module.exports = {
    data,
    run
}