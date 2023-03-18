const ClientError = require('./Errors');
const Client = require('./Client');

/**
 * A Brawl Stars brawler.
 */
class Brawler {
    /**
     * @param {Client} client The client that this brawler was fetched from
     * @param {Object} res Api response
     */
    constructor (client, res) {

        if (!client) return new ClientError('ClassMissingClient', 'Brawler');
        if (typeof client !== Client) return new ClientError('ClassInvalidClient', 'Brawler');
        if (!res) return new ClientError('ClassMissingResponse', 'Brawler');
        if (!res['id']) return new ClientError('ClassInvalidResponse', 'Brawler');

    /**
     * This class's api response.
     * @type {Object}
     */
    this.apiResponse = res;

    /**
     * This brawler's id
     * @type {number}
     */
    this.id = res?.id;

    /**
     * This brawler's name
     * @type {string}
     */
    this.name = res?.name;

    /**
     * A brawler's star power object.
     * @typedef {Object} BrawlerStarPower
     * @property {number} id This star power's id on the api
     * @property {string} name This star power's name
     */

    /**
     * This brawler's star powers
     * @type {Array<?BrawlerStarPower>}
     */
    this.starPowers = res?.starPowers;

    /**
     * A brawler's gadget object.
     * @typedef {Object} BrawlerGadget
     * @property {number} id This gadget's id on the api
     * @property {string} name This gadget's name
     */

    /**
     * This brawler's gadgets
     * @type {Array<?BrawlerGadget>}
     */
    this.gadgets = res?.gadgets;
    }
}

module.exports = Brawler;