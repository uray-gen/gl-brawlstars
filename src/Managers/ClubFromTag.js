const TagResolver = require('../../Functions/TagResolver');
const ApiError = require('../../Errors/ApiError');
const ClientError = require('../../Errors');

const Club = require('../Club');

/**
 * A shortcut for fetching a club.
 */
class ClubFromTag {
    /**
     * @param {Client} client The client to get the club from
     * @param {TagResolvable} tag The club tag to get
     */
    constructor (client, tag) {
        if (!tag) return new ClientError('ClassMissingResponse', 'ClubFromTag');

        /**
         * The client to get the club from.
         * @type {Client}
         */
        this.client = client;

        /**
         * The club tag to get.
         * @type {TagResolvable}
         */
        this.tag = tag;
    }

    /**
     * Get a club data from api.
     * @returns {?Club}
     */
    async fetch() {
        if (!this?.tag) return new Error('EndpointMissingParameter', 'tag');

        this.tag = TagResolver.encode(this.tag)

        let res = await this.client.fetchAPI(`clubs/${this.tag}`);
        if (typeof res === ApiError) return null;
        
        return new Club(this.client, res)
    }
}

module.exports = ClubFromTag;