const { Client } = require('../../../index');
const ApiError = require('../../Errors/ApiError');

const RankedClub = require('../RankedClub');

/**
 * Represents the `rankings/clubs` endpoints at the api.
 */
class ClubRankingsEndpoint {
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
     * Get clubs leaderboard data from api.
     * @param {string} country Two letter country code, or `global` for global rankings.
     * @returns {?Array<RankedClub>}
     */
    async fetch(country) {
        if (!country) return new Error('EndpointMissingParameter', 'country');

        let res = await this.client.fetchAPI(`rankings/${country}/clubs`);
        if (typeof res === ApiError) return null;
        
        return res?.items.map(club => {
            return new RankedClub(club);
        })
    }
  }

  module.exports = ClubRankingsEndpoint;