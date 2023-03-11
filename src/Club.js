const ClientError = require('../Errors');
const Client = require('./Client');

const PlayerFromTag = require('./Managers/PlayerFromTag');

/**
 * A Brawl Stars club.
 */
class Club {
    /**
     * @param {Client} client The client that this club was fetched from
     * @param {Object} res Api response
     */
    constructor (client, res) {

        if (!res) return new ClientError('ClassMissingResponse', 'Club');
        if (!res['tag']) return new ClientError('ClassInvalidResponse', 'Club');

        /**
         * This class's api response
         * @type {Object}
         */
        this.apiResponse = res;
        
        /**
         * This club's in-game tag
         * @type {TagResolvable}
         */
        this.tag = res?.tag;

        /**
         * This club's in-game name
         * @type {string}
         */
        this.name = res?.name;

        /**
         * This club's in-game description
         * @type {string}
         */
        this.description = res?.description;

        /**
         * A club's entrance type. Can be:
         * * `open`: Anyone can join this club
         * * `inviteOnly`: Only invited people, or people who requested and accepted can join this club
         * * `closed`: No one can join this club
         * @typedef {string} ClubEntrance
         */

        /**
         * This club's entrance type
         * @type {ClubEntrance}
         */
        this.entrance = res?.type;

        /**
         * This club's badge's id.
         * @type {number} 
         */
        this.badge = res?.badgeId;

        /**
         * A club's trophy object, required and total trophy counts
         * @typedef {Object} ClubTrophyObject
         * @property {number} required This club's required trophy count
         * @property {number} total This club's total trophy count
         */

        /**
         * This club's trophy object, required and total trophy counts
         * @type {ClubTrophyObject}
         */
        this.trophies = { required: res?.requiredTrophies, total: res?.trophies };

        /**
         * A role in the club for a club member
         * * `notMember`
         * * `member`
         * * `senior`
         * * `vicePresident`
         * * `president`
         * * `unknown`
         * @typedef {string} ClubRole
         */

        /**
         * A club's member
         * @typedef {Object} ClubMember
         * @property {PlayerFromTag} player This member's player data
         * @property {ClubRole} role This member's role in this club
         */

        /**
         * This club's members array
         * @type {Array<ClubMember>}
         */
        this.members = res?.members?.map(member => { return {
            player: new PlayerFromTag(client, member?.tag),
            role: member?.role,
        } })

        /**
         * This club's member count
         * @type {number}
         */
        this.memberCount = this?.members?.length

        /**
         * Returns if this club has reached it's full capacity
         * @type {boolean}
         */
        this.isFull = this?.memberCount === 30 ? true : false
    }
}

module.exports = Club;
