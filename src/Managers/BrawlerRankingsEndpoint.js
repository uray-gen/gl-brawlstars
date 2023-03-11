const { Client } = require('../../../index');
const ApiError = require('../../Errors/ApiError');

const RankedPlayer = require('../RankedPlayer');

/**
 * Represents the `rankings/brawlers` endpoints at the api.
 */
class BrawlerRankingsEndpoint {
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
     * Get brawlers leaderboard data from api.
     * @param {string} country Two letter country code, or `global` for global rankings.
     * @param {number} brawler The id of the brawler
     * @returns {?Array<RankedPlayer>}
     */
    async fetch(country, brawler) {
        if (!country) return new Error('EndpointMissingParameter', 'country');
        if (!brawler) return new Error('EndpointMissingParameter', 'brawler');

        let res = await this.client.fetchAPI(`rankings/${country}/brawlers/${brawler}`);
        if (typeof res === ApiError) return null;
        
        return res?.items.map(player => {
            return new RankedPlayer(player, true);
    })
  }
}

  module.exports = BrawlerRankingsEndpoint;