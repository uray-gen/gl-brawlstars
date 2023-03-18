const ClientError = require('./Errors');
const ClubFromTag = require('./Managers/ClubFromTag');

/**
 * A Brawl Stars club on the leaderboard.
 */
class RankedClub {
    /**
     * @param {Client} client The client that this ranking was fetched from
     * @param {Object} res Api response
     */
    constructor (client, res) {

        if (!client) return new ClientError('ClassMissingClient', 'RankedClub');
        if (!res) return new ClientError('ClassMissingResponse', 'RankedClub');
        if (!res['tag']) return new ClientError('ClassInvalidResponse', 'RankedClub');

        /**
         * The response from the api
         * @type {Object}
         */
        this.apiResponse = res;

        /**
         * This club's club object
         * @type {ClubFromTag}
         */
        this.club = new ClubFromTag(client, res?.tag);

        /**
         * This club's ranking on the leaderboard
         * @type {number}
         */
        this.rank = res?.rank;

    }
}

module.exports = RankedClub;