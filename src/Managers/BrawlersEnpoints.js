const { Client } = require('../../index');
const ApiError = require('../Errors/ApiError');

const Brawler = require('../Brawler');

/**
 * Represents the `brawlers` endpoint at the api.
 */
class BrawlersEndpoints {
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
     * Get a brawler data from api.
     * @param {number} id Brawler's id.
     * @returns {?Brawler}
     */
    async find(id) {
        if (!id) return new Error('EndpointMissingParameter', 'id');

        let res = await this.client.fetchAPI(`brawlers/${id}`);
        if (typeof res === ApiError) return null;
        
        return new Brawler(this.client, res);
    }

    /**
     * Get all the brawlers' data from api.
     * @returns {?Array<Brawler>}
     */
    async fetch() {
        let res = await this.client.fetchAPI(`brawlers`);
        if (typeof res === ApiError) return null;
        
        return res?.items.map(brawler => {
            return new Brawler(this.client, brawler);
        });
    }
}

module.exports = BrawlersEndpoints;
