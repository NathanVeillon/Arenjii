const HelpMessage = {
    callon:
        '\n__Call-On Trait__' +
        '\nFunction: Rerolls all traitor dice in your previous roll. Usable once per roll.' +
        '\nForm: `~co` or `~callon`',
    difficulty:
        '\n__Difficulty Calculator__' +
        '\nFunction: Returns if a test is Routine, Difficult or Challenging.' +
        '\nForm: `~diff X Y` or `~difficulty X Y` or ~rdc X Y`' +
        '\n\t` X` is the number of dice rolled.' +
        '\n\t` Y` is the Obstacle of the test.',
    dof:
        '\n__Die of Fate__' +
        '\nFunction: Rolls a single die.' +
        '\nForm: `~dof {tags}`' +
        '\nExtra Tags:' +
        '\n\t` +#` adds `#` [1-9] to the result of the roll.' +
        '\n\t` -#` subtracts `#` [1-9] to the result of the roll.',
    dow:
        'This feature is in testing and has not been completed yet\n' +
        '\n__Duel of Wits Guide__' +
        '\nFunction: a quick look up for the mechanics and interactions of the various Duel of Wits actions.' +
        '\nForm: `~dow {action} {action}`' +
        '\nNotes:' +
        '\n\t- No actions: Displays a list of recognized action keywords.' +
        '\n\t- One action: displays the mechanics of the action.' +
        '\n\t- Two Actions: displays the interaction when the two actions are scripted against each other.',
    luck:
        '\n__Luck, Fate point__' +
        '\nFunction: Rerolls all 6s in your previous roll if it wasn\'t open-ended or one traitor die if it was. Usable once per roll.' +
        '\nForm: `~fate` or `~luck`',

    grace:
        '\n__Saving Grace, Deeds Point__' +
        '\nFunction: Rerolls all Traitor Dice in your previous roll. Usable once per roll.' +
        '\nForm: `~grace`',
    help:
        '\n__Bot Manual__'+
        '\nFunction: displays information about Arenjii\'s various uses.'+
        '\nForm: `~help {command}`. eg. `~help diff`'+
        '\nNotes: if no commands are specified it will display a brief summary of all of Arenjii\'s commands\n\t',
    prev:
        '\n__Display Previous Roll__'+
        '\nFunction: Displays your previous roll or that of the mentioned user, including all changes made to it afterwards such as with `~callon`, `~fate` and `~vs`'+
        '\nForm: `~pr` or `~prev` optional: `@user`. eg `~prev @Arenjii#4939`',
    rac:
        'This feature is in testing and has not been completed yet\n'+
        '\n__Range and Cover Guide__'+
        '\nFunction: a quick look up for the mechanics and interactions of the various Range and Cover Maneuvers.'+
        '\nForm: `~rac {action} {action}`'+
        '\nNotes:' +
            '\n\t- No actions: Displays a list of recognized maneuver keywords.' +
            '\n\t- One action: displays the mechanics of the maneuver.' +
            '\n\t- Two Actions: displays the interaction when the two maneuvers are scripted against each other.',
    roll:
        '\n__Roll the Dice__'+
        '\nFunction: Rolls a pool of dice'+
        '\nForm: `~X#{!} {Tags...}`'+
            '\n\t`X` Accepts `b`, `g` or `w`. Determines the __Shade__ (Black, Grey or White respectively) of the roll.'+
            '\n\t`#` the __Base Exponent__ of the Test to be rolled [0-99].'+
            '\n\t`!` *optional*; adding this makes the roll Open-Ended'+
        '\nExtra Tags:'+
            '\n\t`ad#` __Advantage__ Adds `#` advantage dice to the roll.'+
            '\n\t`ar#` __Artha__ Adds `#` Artha dice to the roll.'+
            '\n\t`as#` __Astrology, FoRK__: Adds special Astrology FoRK dice. # = [Astrology exponent].'+
            '\n\t`bl ` __Beginners\' Luck__: Multiplies Base Obstacle by 2, calculates if the test goes towards the ability or the skill'+
            '\n\t`bn#` __Boon, Deeds Point__: Adds `#` (3 Max) Artha dice to the roll.'+
            '\n\t`di ` __Divine Inspiration, Deeds Point__: Adds [Base Exponent] Artha dice to the roll.'+
            '\n\t`ds#` __Disadvantage__: Adds `#` to the Base Obstacle.'+
            '\n\t`fk#` __FoRK__: Functionally identical to `ad`. See `as` to FoRK in Astrology'+
            '\n\t`he#` __Helper Exponent__: Adds Help Dice from an Exponent of `#` [1-10].'+
            '\n\t`ns`  __Not Saved__: Do not save this roll. Several features use your previous roll'+
            '\n\t`ob#` __Obstacle, Base__: Set the Base Obstacle of the task to `#`.'+
            '\n\t`oe#` __Open-Ended__: Adds `#` dice to the roll that are Open-Ended independantly of the base roll'+
            '\n\t`ox#` __Obstacle, Multiplier__: Multiplies the Base Obstacle by `#`.'+
            '\n\t`vs ` __Versus Test__: Hide the results of the roll and add it to this channel\'s VS Stack. Trigger the Versus Test with `~vs`.'+
        '\nNotes:' +
            '\n\t- Its usually okay to include FoRKs and Advantage dice in your Exponent. The exception being when the `di` tag is included.' +
            '\n\t- Similarly, unless the `bl` or `ox` tags are included it\'s alright to forgo the `ds` tag',
    test:
        '\n__Areas for Improvement__'+
        '\nFunction: Displays a list of things that need testing.'+
        '\nForm: `~test`',
    vs:
        '\n__Versus Test__'+
        '\nFunction: Compares rolls. Which rolls are compared depends on how many mentions follow the command.'+
        '\nForm: `~vs {Tags...}`'+
        '\nExtra Tags:' +
            '\n\t- `clear`: Empties this channel\'s VS Stack (rolls made with the `vs` tag).' +
            '\n\t- No Mentions: compares all rolls in this channel\'s VS stack. Clears the stack if successful.' +
            '\n\t- One Mention: Compares mentioned person\'s last roll vs your last roll.' +
            '\n\t- Two+ Mentions: Compares the last rolls of every person mentioned.'+
        '\nNotes:' +
            '\n\t- The VS Stack is unique to each text channel, rolls made in different places will not be compared.' +
            '\n\t- Each person\'s most recent roll is saved, this is independent of the channel it is made in, including DMs to the bot',
    fight:
        'This feature has not been implemented yet',
    prob:
        'This feature has not been implemented yet',
    default:
        '\n' +
        '\nAll commands are case insensitive so yell if you like. Speak slowly though, add spaces between tags so I can understand you.'+
        '\nCurly braces `{}` denote optional features explained in the help text for the individual command.'+
        '\nFor more detail on individual commands use `~help {command}`.' +
            '\n\tExample: `~help vs`.'+
        '\n' +
        '\n`~co`: See `~callon`'+
        '\n`~callon`: __Call On Trait__ rerolls all traitor dice. Tracked separatetly from Saving Grace.'+
        '\n`~diff X Y`: See `difficulty`'+
        '\n`~difficulty X Y`: __Difficulty Calculator__ Returns if a roll of `X` dice against an Ob of `Y` is Routine, Difficult or Challenging.'+
        '\n`~dof {tags...}`: __Die of Fate__ Rolls a single die.'+
        '\n`~dow` __Duel of Wits Guide__ **In Testing**'+
        '\n`~fate`: See `~luck`.'+
        '\n`~fight` __Fight! Guide__ **Unimplemented**'+
        '\n`~grace`: __Saving Grace, Deeds Point__ Rerolls all traitor dice, tracked separately from Call-on.'+
        '\n`~help {command}`: __Specific Help__ gives more details about individual commands.'+
        '\n`~luck`: __Luck, Fate point__ Rerolls all 6s in the previous roll if it wasn\'t open-ended or one traitor die if it was. Only useable once per roll'+
        '\n`~pr {@user}`: See `~prev`'+
        '\n`~prev {@user}`: __Previous Roll__: displays the previous roll.'+
        '\n`~prob`: __Probability__: **Unimplemented** Calculates the possible outcomes of a given roll.'+
        '\n`~rac`__Range and Cover Guide__ **In Testing**'+
        '\n`~rdc X Y`: See `difficulty`'+
        '\n`~test`: __How Can I Help?__ displays a list of things that need testing.'+
        '\n`~vs {@user...}`: __Versus Test__ Pits two or more rolls against eachother.'+
        '\n' +
        '\n`~b#{!}`, `~g#{!}`, `~w#{!}` all include `{tags...}`. Rolls a pool of `#` [0-99] black, grey or white dice respectively.' +
            '\n\ttype `~help roll` for more info on how to roll.'+
        '\n' +
        '\nPlease PM Saelvarath#5785 if you find any bugs or have other comments or suggestions!' +
            '\n\tA note to all using phones or international keyboards: the `~` can be replaced by `\\` in all commands for less hassle.'
}

//Setup Aliases, Not the Cleanest ToDo: Make Function To Create Aliases From Object Structure
HelpMessage.co = HelpMessage.callon;

HelpMessage.diff = HelpMessage.difficulty;
HelpMessage.rdc = HelpMessage.difficulty;

HelpMessage.fate = HelpMessage.luck;

HelpMessage.pr = HelpMessage.prev;

const HelpChoices = Object.keys(HelpMessage).map(k => { return {"name":k, "value":k}});

module.exports =  {HelpMessage, HelpChoices};

