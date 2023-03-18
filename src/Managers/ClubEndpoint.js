const { Client } = require('../../index');
const TagResolver = require('../../Functions/TagResolver');
const ApiError = require('../../Errors/ApiError');

const Club = require('../Club');

/**
 * Represents the `clubs` endpoint at the api.
 */
class ClubEndpoints {
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
     * Get a club data from api.
     * @param {TagResolvable} tag Club's tag.
     * @returns {?Club}
     */
    async fetch(tag) {
        if (!tag) return new Error('EndpointMissingParameter', 'tag');

        tag = TagResolver.encode(tag)

        let res = await this.client.fetchAPI(`clubs/${tag}`);
        if (typeof res === ApiError) return null;
        
        return new Club(this.client, res)
    }
}

module.exports = ClubEndpoints;