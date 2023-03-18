const ClientError = require('./Errors');
const Client = require('./Client');

/**
 * A Brawl Stars player's battle log.
 * Note: It may take up to 30 minutes for a new battle to appear in the `players/battlelog` endpoint.
 */
class BattleLog {
    /**
     * @param {Client} client The client that this player was fetched from
     * @param {Object} res Api response
     */
    constructor (client, res) {

        if (!res) return new ClientError('ClassMissingResponse', 'BattleLog');
        if (!res['tag']) return new ClientError('ClassInvalidResponse', 'BattleLog');

        /**
         * This class's api response.
         * @type {Object}
         */
        this.apiResponse = res;

        /**
         * A match's event in a battle log.
         * @typedef {Object} BattleLogMatchEvent
         * @property {number} id This event's id on the api
         * @property {string} mode This event's (game) mode's name. Be aware: (Game) modes are returned by lower case first letter on the first word, but upper case first letter on the other words! Example: `soloShowdown`
         * @property {string} map This event's map that the match took place
         */

        /**
         * A battle's result for a player. It can be:
         * * `victory`
         * * `defeat`
         * * or `draw`
         * @typedef {string} BattleResult
         */

        /**
         * A battle's players' brawler object.
         * @typedef {Object} BattlePlayerBrawler
         * @property {number} id This brawler's id on the api
         * @property {string} name This brawler's name
         * @property {number} power This brawler's power level on the player's (who is playing it's) account
         * @property {number} trophies This brawler's trophies before this match on the player's (who is playing it's) account
         */

        /**
         * A battle's star player object.
         * @typedef {Object} BattleStarPlayer
         * @property {string} tag The star player's in-game tag
         * @property {string} name The star player's in-game name
         * @property {BattlePlayerBrawler} brawler The star player's used brawler for this match
         */

        /**
         * A match's battle info.
         * @typedef {Object} BattleLogMatchBattleInfo
         * @property {string} mode This battle's (game) mode's name. Be aware: (Game) modes are returned by lower case first letter on the first word, but upper case first letter on the other words! Example: `soloShowdown`
         * @property {string} type This battle's ranking type. It might not be ranked
         * @property {BattleResult} result This battle's result for this player
         * @property {number} duration This battle's duration in seconds
         * @property {number} trophyChange This battle's change in trophies for this player
         * @property {BattleStarPlayer} starPlayer This battle's star player object
         * @property {?Array<BattleTeam>} teams This battle's teams. See {@link BattleLogMatchBattleInfo#players} for `soloShowdown`, `duels` etc.
         * @property {?Array<BattlePlayer>} players This battle's players. See {@link BattleLogMatchBattleInfo#teams} for teamed events
         */

        /**
         * A match in a battle log.
         * @typedef {Object} BattleLogMatch
         * @property {string} battleTime The time that the battle was played in `Zulu time`
         * @property {BattleLogMatchEvent} event The event that this match took place
         * @property {BattleLogMatchBattleInfo} battle The battle info for this match
         */

        /**
         * Returns the battle log as an array.
         * @type {Array<BattleLogMatch>}
         */
        this.array = res?.items;
    }
}

module.exports = BattleLog;