const { Client } = require('../../index');
const TagResolver = require('../../Functions/TagResolver');
const BattleLog = require('../BattleLog');
const ApiError = require('../../Errors/ApiError');

/**
 * Respresents `players/battlelog` endpoint at the api.
 */
class BattleLogEndpoint {
    /**
     * @param {Client} client The client to get endpoints from
     */
    constructor (client) {
        /**
         * This endpoint's client.
         * @type {Client}
         */
        this.client = client;
    }

    /**
     * Get a player battle log data from api.
     * @param {TagResolvable} tag Player's tag.
     * @returns {?BattleLog}
     */
    async fetch(tag) {
        if (!tag) return new Error('EndpointMissingParameter', 'tag');

        tag = TagResolver.encode(tag)

        let res = await this.client.fetchAPI(`players/${tag}/battlelog`);
        if (typeof res === ApiError) return null;
        
        return new BattleLog(this.client, res)
    }
}

module.exports = BattleLogEndpoint;