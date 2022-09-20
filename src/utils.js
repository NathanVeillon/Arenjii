const routineTest = [0, 1, 1, 2, 2, 3, 4, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

// Guild Ids For Guild Commands, not required, but allows for faster testing of commands
const GUILD_IDS = ['963283808277385276']

function RDC (pool, ob)
{
    /*
        Challenging = # of dice rolled +1
        Difficult = # of dice rolled and below but above RoutineChallenge
        if diceRolled > routineTest.length us use diceRolled-3?
    */

    if ( ob > pool )
    {	return 'Challenging';	}
    else if ( ob > routineTest[pool] )
    {	return 'Difficult';	}
    else
    {	return 'Routine';	}
}

module.exports = {routineTest, GUILD_IDS, RDC}