const { Client } = require('../../index');
const ApiError = require('../Errors/ApiError');

const RankedPlayer = require('../RankedPlayer');

/**
 * Represents the `rankings/player` endpoints at the api.
 */
class PlayerRankingsEndpoint {
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
     * Get players leaderboard data from api.
     * @param {string} country Two letter country code, or `global` for global rankings.
     * @returns {?Array<RankedPlayer>}
     */
    async fetch(country) {
        if (!country) return new Error('EndpointMissingParameter', 'country');

        let res = await this.client.fetchAPI(`rankings/${country}/players`);
        if (typeof res === ApiError) return null;
        
        return res?.items.map(player => {
            return new RankedPlayer(player);
        })
    }
  }

  module.exports = PlayerRankingsEndpoint;