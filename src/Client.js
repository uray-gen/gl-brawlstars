const Error = require('../Errors');
const ApiError = require('../Errors/ApiError');

const PlayersEndpoints = require('./Managers/PlayersEndpoints');
const ClubEndpoint = require('./Managers/ClubEndpoint');
const RankingsEndpoints = require('./Managers/RankingsEndpoints');
const BrawlersEndpoints = require('./Managers/BrawlersEnpoints');
const RotationEndpoint = require('./Managers/RotationEndpoint');

/**
 * The Brawl Stars client, a starting point.
 */
class Client {
    /**
     * The options for a Brawl Stars client.
     * @typedef {Object} ClientOptions
     * @property {string} token The token for this client, get it from https://developer.brawlstars.com/#/account
     */

    /**
     * @param {ClientOptions} options The options to be applied to this client
     */
    constructor (options) {
        if (!options?.token) return new Error('ClientMissingOption', 'options.token');
        
        /**
         * The options applied to this client
         * @type {ClientOptions}
         */
        this.options = options;

        /**
         * Uses players endpoints. Includes `players` and `players/battlelog`.
         * @type {PlayersEndpoints} 
         */
        this.players = new PlayersEndpoints(this);

        /**
         * Uses clubs endpoint. Includes `clubs`.
         * @type {ClubEndpoint}
         */
        this.clubs = new ClubEndpoint(this);

        /**
         * Uses rankings endpoints. Includes `rankings/clubs`, `rankings/brawlers`, `rankings/players`.
         * @type {RankingsEndpoints}
         */
        this.rankings = new RankingsEndpoints(this);

        /**
         * Uses brawlers endpoints. Includes `brawlers`.
         * @type {BrawlersEndpoints}
         */
        this.brawlers = new BrawlersEndpoints(this);

        /**
         * Uses events endpoint. Includes `events/rotation`.
         * @type {RotationEndpoint}
         */
        this.rotation = new RotationEndpoint(this);
    }

    /**
     * Fetches an endpoint using this client.
     * @param {string} apiUrl The url for the api endpoint
     * @returns {?Promise<*>}
     * @private
     */
    async fetchAPI(apiUrl) {
        const res = await fetch(`https://api.brawlstars.com/v1/${apiUrl}`, {
            headers: {      
                Authorization: `Bearer ${this.options.token}`,
                Accept: 'application/json'
            }
          })

          if (!res.ok) throw new ApiError(res, await res.text())
          return await res.json()
    }
}

module.exports = Client;