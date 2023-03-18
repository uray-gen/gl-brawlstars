const { Client } = require('../../index');
const ApiError = require('../../Errors/ApiError');

const RotatingEvent = require('../RotatingEvent');

/**
 * Represents the `events/rotation` endpoint at the api.
 */
class RotationEndpoint {
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
     * Get event's rotation data from api.
     * @returns {?RotatingEvent}
     */
    async fetch() {
        let res = await this.client.fetchAPI(`events/rotation`);
        if (typeof res === ApiError) return null;
        
        return res?.map(event => {
            return new RotatingEvent(event)
        })
    }
}

module.exports = RotationEndpoint;