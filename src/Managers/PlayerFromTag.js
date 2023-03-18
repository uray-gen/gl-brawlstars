const TagResolver = require('../Functions/TagResolver');
const ApiError = require('../../Errors/ApiError');
const ClientError = require('../../Errors');

const Player = require('../Player');

/**
 * A shortcut for fetching a player.
 */
class PlayerFromTag {
    /**
     * @param {Client} client The client to get the club from
     * @param {TagResolvable} tag The player tag to get
     */
    constructor (client, tag) {
        if (!tag) return new ClientError('ClassMissingResponse', 'PlayerFromTag');

        /**
         * The client to get the player from.
         * @type {Client}
         */
        this.client = client;

        /**
         * The player tag to get.
         * @type {TagResolvable}
         */
        this.tag = tag;
    }

    /**
     * Get a player data from api.
     * @returns {?Player}
     */
    async fetch() {
        if (!this?.tag) return new Error('EndpointMissingParameter', 'tag');

        this.tag = TagResolver.encode(this.tag)

        let res = await this.client.fetchAPI(`players/${this.tag}`);
        if (typeof res === ApiError) return null;
        
        return new Player(this.client, res)
    }
}

module.exports = PlayerFromTag;