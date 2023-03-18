const { Client } = require('../../index');
const BattleLogEndpoint = require('./BattleLogEndpoint');
const TagResolver = require('../Functions/TagResolver');
const ApiError = require('../../Errors/ApiError');

const Player = require('../Player');

/**
 * Represents the `players` endpoints at the api.
 */
class PlayersEndpoints {
    /**
     * @param {Client} client The client to get endpoints from
     */
    constructor (client) {
        /**
         * This endpoint's client.
         * @type {Client}
         */
        this.client = client;

        /**
         * Use players battle log endpoint.
         * @type {BattleLogEndpoint}
         */
        this.battleLog = new BattleLogEndpoint(client);
    }

    /**
     * Get a player data from api.
     * @param {TagResolvable} tag Player's tag.
     * @returns {?Player}
     */
    async fetch(tag) {
        if (!tag) return new Error('EndpointMissingParameter', 'tag');

        tag = TagResolver.encode(tag)

        let res = await this.client.fetchAPI(`players/${tag}`);
        if (typeof res === ApiError) return null;
        
        return new Player(this.client, res)
    }
}

module.exports = PlayersEndpoints;