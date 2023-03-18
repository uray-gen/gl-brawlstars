const { Client } = require('../../index');

const ClubRankingsEndpoint = require('./ClubRankingsEndpoint');
const BrawlerRankingsEndpoint = require('./BrawlerRankingsEndpoint');
const PlayerRankingsEndpoint = require('./PlayerRankingsEndpoint');

/**
 * Represents the `rankings` endpoints at the api.
 */
class RankingsEndpoints {
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
         * Use `rankings/clubs` endpoint.
         * @type {ClubRankingsEndpoint}
         */
        this.clubs = new ClubRankingsEndpoint(client);

        /**
         * Use `rankings/brawlers` endpoint.
         * @type {BrawlerRankingsEndpoint}
         */
        this.brawlers = new BrawlerRankingsEndpoint(client);

        /**
         * Use `rankings/clubs` endpoint.
         * @type {PlayerRankingsEndpoint}
         */
        this.players = new PlayerRankingsEndpoint(client);
    }
  }

  module.exports = RankingsEndpoints;