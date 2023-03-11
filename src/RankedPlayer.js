const ClientError = require('../Errors');
const PlayerFromTag = require('./Managers/PlayerFromTag');

/**
 * A Brawl Stars player on the leaderboard.
 */
class RankedPlayer {
    /**
     * @param {Client} client The client that this ranking was fetched from
     * @param {Object} res Api response
     * @param {boolean} [viaBrawler] If this player have ranked from a brawler
     */
    constructor (client, res, viaBrawler) {

        if (!res) return new ClientError('ClassMissingResponse', 'RankedPlayer');
        if (!res['tag']) return new ClientError('ClassInvalidResponse', 'RankedPlayer');

        /**
         * The response from the api
         * @type {Object}
         */
        this.apiResponse = res;

        /**
         * This player's player object
         * @type {ClubFromTag}
         */
        this.player = new PlayerFromTag(client, res?.tag);

        if (viaBrawler && viaBrawler === true) {
        
        /**
         * This player's brawler's trophies, which is ranked on the leaderboard
         * @type {?number}
         */
        this.brawlerTrophies = res?.trophies;
        }

        /**
         * This player's ranking on the leaderboard
         * @type {number}
         */
        this.rank = res?.rank;

    }
}

module.exports = RankedPlayer;