const {RDC} = require('./utils.js');

class DicePool
{

    static rollPattern = RegExp( '([bgw])(\\d{1,2})(!?)', 'i' );
    static flagPattern = RegExp( '\\b([a-z]{1,2})(\\d{0,2})\\b', 'i' );

    // Constructor
    constructor()
    {
        this.arthaDice = 0;			// number of dice added through spending Artha
        this.astroDice = 0;			// number of dice added through Astrology FoRK
        this.astroPool = [];		// results of astrological FoRKs/Help
        this.astroResult = 0;		// Successes gained or lost through Astrology
        this.beginnersLuck = false;	// do you actually have the right skill for the job?
        this.booned = 0;			// How many Persona Points have been spent on this roll?
        this.basePool = [];			// array of dice results, includes FoRKs, Artha Dice, Advantage Dice
        this.calledOn = false;		// if a Call-on Trait has been used on this roll.
        this.exponent = 0;			// BASE number of dice rolled, Exponent of the roll.
        this.fated = false;			// if a Fate point has been spent on this roll
        this.graced = false;		// if a Saving Grace has been employed on this roll
        this.helperDice = 0;		// number of dice added by helpers
        this.helperExponent = [];	// the exponent of your helpers
        this.helperPool = [];		// how much your companions 'helped' you
        this.openEndedDice = 0;		// how many dice or independently open-ended (before explosions)
        this.openEndedPool = [];	// dice that are open-ended regardless of the base roll
        this.inspired = false;		// has Divine Inspiration struck this roll?
        this.isOpenEnded = false;	// do dice explode?
        this.nonArtha = 0;			// the number of non-artha dice added to the roll
        this.ObAddition = 0;		// added to Base Obstacle after it's multiplied
        this.ObMultiplier = 1;		// for all you double Ob needs.
        this.obstacle = 0;			// BASE obstacle of the roll
        this.owner = 'Hugh Mann';	// Who rolled the dice
        this.reps = 0;				// rank in the VS Stack
        this.shade = 4;				// shade of the roll, 4 = black, 3 = grey, 2 = white
        this.successes = 0;			// the number of successes gained through rolls
        this.totalRolled = 0;		// how many dice ultimately end up being rolled (before explosions)

        this.isVS = false;
        this.saveRoll = true;
    }

    /**
     *
     * @param firstCmd the Base Dice and Shade to Roll, e.g. b4!, g10, w2
     * @param args Additional flags that modify the base roll
     *
     *
     *
     * ToDo: List of New Options To Add To A Roll
     *
     * Greed:
     *     - Aids or hinders Resource tests
     *     - 1Pp: add [1-Greed] dice to a roll. Act as Artha Dice.
     *     Grief:
     *     - 1Dp, add [Grief] dice to a spell/skill song exponent. Independently Open-Ended.
     * Hatred:
     *     - 1/session: may test Hatred in place of any skill or stat if appropriate. Open-Ended.
     *     - 1Dp: add [Hatred] to the roll instead of doubling exponent. Independently Open-Ended.
     * Spite:
     *     - 1Dp: add [Spite] dice to a roll.
     * Corruption:
     *     - may test Corruption in place of Forte for spell tax
     *     - 1Fp: Corruption Exponent helps skill/stat roll.
     *     - 1Pp: may test Corruption in place of any skill or stat
     *     - 1Dp: add [Corruption] to the roll instead of doubling exponent.
     *
     * Maybe Rune Casting, Nature of all things also function like this?
     *
     *
     */
    constructDiceProfile(firstCmd, args){
        let firstExp = DicePool.rollPattern.exec( firstCmd );

        this.exponent = Number(firstExp[2]);
        this.shade = [ 0, 0, 'w', 'g', 'b' ].indexOf( firstExp[1] ); //W = 2, G = 3, B = 4
        this.isOpenEnded = firstExp[3] === '!';

        // read and interpret each token
        args.forEach( token =>
        {
            let flag = DicePool.flagPattern.exec( token );

            if ( flag )
            {
                let amount = Number( flag[2] );

                switch ( flag[1] )
                {
                    case 'ad':  // Advantage dice
                    //+ restrict to +2D
                    case 'fk':  // FoRK dice
                        this.nonArtha += amount;
                        break;
                    case 'as':  // Astrology
                        if ( amount !== 0 && this.astroDice === 0)
                        {
                            this.astroDice++;

                            if ( amount >= 5 )
                            {
                                this.astroDice++;
                            }
                        }
                        break;
                    case 'ar':  //misc artha //todo ask about misc artha dice and why they aren't included in boon dice.
                    case 'p':
                        this.arthaDice += amount;
                        break;
                    case 'bl':  // Beginner's Luck
                        if ( !this.beginnersLuck )
                        {
                            this.ObMultiplier *= 2;
                            this.beginnersLuck = true;
                        }
                        break;
                    case 'bn':  // Boon; Persona Point - +1D-3D to a roll
                        if ( this.booned < 3 )
                        {
                            if ( amount + this.booned >= 3 )
                            {
                                this.arthaDice = 3;
                                this.booned = 3;
                            }
                            else
                            {
                                this.arthaDice += amount;
                                this.booned += amount;
                            }
                        }
                        break;
                    case 'di':  // Divine Inspiration; Deeds Point - doubles base Exponent
                        if ( !this.inspired )
                        {
                            this.arthaDice += this.exponent;
                            this.inspired = true;
                        }
                        break;
                    case 'ds':  // Disadvantage
                        this.ObAddition += amount;
                        break;
                    case 'he':  // Helper dice
                        if ( amount > 6 )
                        {
                            this.helperPool.push( [0, 0] );
                            this.helperDice += 2;
                        }
                        else if ( amount )
                        {
                            this.helperPool.push( [0] );
                            this.helperDice++;
                        }
                        this.helperExponent.push( amount );
                        break;
                    case 'ob':  // Base obstacle
                        this.obstacle = amount;
                        break;
                    case 'oe':
                        this.openEndedDice += amount;
                        break;
                    case 'ox':  // Base Obstacle multiplier
                        this.ObMultiplier *= amount > 0 ? amount : 1;
                        break;
                    case 'ns':  // No save
                        this.saveRoll = false;
                        break;
                    case 'vs':  // this is a VS test?
                        this.isVS = true;
                        break;
                }
            }
        });

        // Find total dice rolled
        this.totalRolled = this.exponent + this.arthaDice + this.nonArtha + this.openEndedDice + this.astroDice + this.helperDice;
    }

    roll(){
        for ( let a = 0; a < this.astroDice; a++ )
        {
            let astRoll = DicePool.rollDie();
            this.astroResult += astRoll >= this.shade;
            this.astroPool.push( astRoll );

            while(astRoll === 6 )
            {
                astRoll = DicePool.rollDie();
                this.astroResult += astRoll >= this.shade;
                this.astroPool.push( astRoll );
            }

            if ( astRoll === 1 )
            {
                astRoll = DicePool.rollDie();
                this.astroResult -= astRoll < this.shade; //todo ask clarification on departure from RaW on astrology failure
                this.astroPool.push( astRoll );
            }
        }

        // roll Independently Open-Ended dice
        // todo ask clarification on independent open-ended dice
        this.rollDiceGroup(this.openEndedDice, this.openEndedPool, true)

        // Roll Helper dice
        for (let h = 0; h < this.helperPool.length; h++ )
        {
            // Done To Keep Track of Each Individual Helper
            let helpRoll = [];
            this.rollDiceGroup(this.helperPool[h].length, helpRoll);

            this.helperPool[h] = helpRoll;
        }

        // Roll Exponent dice
        let standardDiceTotal = this.exponent + this.arthaDice + this.nonArtha;
        this.rollDiceGroup(standardDiceTotal, this.basePool)
    }

    rollDiceGroup(diceToRoll, group, forceOe=false){
        let shouldOpenEnd = forceOe || this.isOpenEnded;
        for (let d = 0; d < diceToRoll; d++)
        {
            let r = DicePool.rollDie();
            if ( r >= this.shade ) this.successes++;
            if (shouldOpenEnd && r === 6 ) d--;

            group.push( r );
        }
    }

    static rollDie(){
        return  1 + Math.floor( Math.random() * 6 );
    }

    // DicePool.printPool()
    printPool()
    {
        let msg = `${this.owner} rolled ${this.totalRolled} ${[ 0, 0, 'White', 'Grey', 'Black' ][ this.shade ]} ${this.isOpenEnded ? 'Open-Ended' : 'shaded'} dice`;
        msg += `${this.beginnersLuck ? `, Beginner's Luck,` : ``}`;
        msg += `${this.obstacle > 0 ? ` against an Ob of ${this.obstacle * this.ObMultiplier + this.ObAddition}` : ''}`;
        msg += `${this.ObMultiplier > 1 && this.obstacle > 0 ? ` [${this.obstacle} \* ${this.ObMultiplier}${this.ObAddition !== 0 ? ` \+ ${this.ObAddition}` : ``}].` : '.'}`;

        // print base dice
        if ( this.basePool.length )
        {
            msg += `\nExponent dice: ${ DicePool.diceSugar( this.basePool, this.shade, this.isOpenEnded ) }`;
            msg += this.arthaDice > 0 ? ` ${this.arthaDice} of which were gained by spending Artha` : '';
            //-msg += '\nActual roll: {' + this.basePool.toString() + '}';
        }

        //+ Independently Open-Ended dice
        if ( this.openEndedDice > 0 )
        {
            msg += `\nOpen-Ended: ${DicePool.diceSugar( this.openEndedPool, this.shade, true)}`;
        }

        // determine helper test difficulty
        for ( let helper = 0; helper < this.helperPool.length; helper++ )
        {
            msg += `\nHelper${helper} added ${DicePool.diceSugar( this.helperPool[helper], this.shade, this.isOpenEnded )} to the roll`;

            if ( this.obstacle > 0 )
            {
                msg += ` and earned a ${RDC( this.helperExponent[helper], this.obstacle + this.ObAddition )} test`;
            }

            msg += '.';
        }

        // tally & output astrology results
        if ( this.astroDice > 0 )
        {
            msg += `\nFortune Dice: ${DicePool.diceSugar( this.astroPool, this.shade, 2 )}`;
            msg += `\nThe Stars were ${this.astroResult > 0 ? 'right' : 'wrong'} and their fate gives them ${this.astroResult} success this roll`;
        }

        // determine Main test difficulty
        let totesSuccesses = this.successes + this.astroResult;
        let totesObstacle = this.obstacle * this.ObMultiplier + this.ObAddition;

        if ( this.obstacle > 0 )
        {
            msg += totesSuccesses >= totesObstacle ?	`\nThat's a success with a margin of ${totesSuccesses - totesObstacle} and they got ` :
                `\nTraitorous dice! That's a *failure* of ${totesObstacle - totesSuccesses}... \nAt least they got `;

            let bl = RDC( this.exponent + this.nonArtha + this.astroDice + this.helperDice, this.obstacle + this.ObAddition );

            if ( this.beginnersLuck )
            {
                msg += bl === 'Routine' ? 'to advance towards learning a **new Skill**!' : `a ${bl} test towards their **Root Stat**!`;
            }
            else
            {
                msg += ` ${bl} test.`;
            }
        }
        else
        {
            if ( this.ObMultiplier > 1 )
            {
                msg += `\nThat's ${totesSuccesses} in total and effective success of ${Math.floor( ( totesSuccesses - this.ObAddition ) / this.ObMultiplier )} on a graduated test.`;
            }
            else
            {
                msg += totesSuccesses > 0 ? `\nThat's ${totesSuccesses} success${totesSuccesses === 1 ? '' : 'es'}!` : '\nNo successes? looks like things are about to get interesting!';
            }
        }
        return msg;
    }


    // WARNING: Illegible mess.
    static diceSugar(pool, shade, isOpen)
    {
        let msg = '[';

        if ( Array.isArray( pool ) )
        {
            // for each element
            for ( let d = 0; d < pool.length; d++ )
            {
                // iterate through N dimensional arrays
                if ( Array.isArray( pool[d] ) )
                {
                    msg += DicePool.diceSugar( pool[d], shade, isOpen );
                }
                // if dice explode
                else if (isOpen && ( pool[d] === 6 || pool[d] === 1 ) )
                {
                    if ( pool[d]  === 6 )
                    {
                        msg += ( d === 0 ? `__**${pool[d]}` : `, __**${pool[d]}` );

                        while ( pool[d + 1] === 6 )
                        {
                            msg += `, ${pool[++d]}`;
                        }

                        if ( isOpen === 2 && pool[d + 1] === 1 )
                        {
                            msg += `**, ~~${pool[++d]}, ${pool[++d]}~~`;
                        }
                        else
                        {
                            msg += ( pool[++d] >= shade ? `, ${pool[d]}**` : `**, ${pool[d]}`);
                        }

                        msg += '__';
                    }
                    // if 1s explode
                    else if ( isOpen === 2 && pool[d] ===1 && d !== pool.length )
                    {
                        msg += ( d === 0 ? `~~${pool[d]}, ${pool[++d]}~~` : `, ~~${pool[d]}, ${pool[++d]}~~` );
                    }
                    // if 1s don't explode
                    else
                    {
                        msg += ( d === 0 ? pool[d] : `, ${pool[d]}` );
                    }
                }
                else if ( pool[d] >= shade )
                {
                    msg += ( d === 0 ? `**${pool[d]}**` : `, **${pool[d]}**` );
                }
                else
                {
                    msg += ( d === 0 ? pool[d] : `, ${pool[d]}` );
                }
            }
            msg += ']';
        }

        return msg;
    }
}

module.exports = {DicePool};