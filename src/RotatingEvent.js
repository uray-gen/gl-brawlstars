const ClientError = require('./Errors');

/**
 * Brawl Stars's rotating event.
 */
class RotatingEvent {
    /**
     * @param {Object} res Api response
     */
    constructor (res) {

        if (!res) return new ClientError('ClassMissingResponse', 'RotatingEvent');
        if (!res['event']) return new ClientError('ClassInvalidResponse', 'RotatingEvent');

        /**
         * This class's api response.
         * @type {Object}
         */
        this.apiResponse = res;

        /**
         * This event's game mode's id.
         * @type {number}
         */
        this.id = res?.event?.id;

        /**
         * This event's game mode's name.
         * @type {string}
         */
        this.mode = res?.event?.mode;

        /**
         * This event's map's name.
         * @type {string}
         */
        this.map = res?.event?.map;

        /**
         * An event's modifiers, if any avaible. Can be:
         * * `unknown` 
         * * `none` 
         * * `energyDrink` 
         * * `angryRobo` 
         * * `meteorShower` 
         * * `graveyardShift` 
         * * `healingMushrooms` 
         * * `bossFightRockets` 
         * * `takedownLasers` 
         * * `takedownChainLightning` 
         * * `takedownRockets` 
         * * `waves` 
         * * `hauntedBall` 
         * * `superCharge` 
         * * `fastBrawlers` 
         * * `showdown+` 
         * * `peekABoo` 
         * * `burningBall`
         * @typedef {string} EventModifier
         */

        if (res?.event?.modifiers) {
            
        /**
         * This event's modifiers, if any avaible.
         * @type {?Array<EventModifier>|?EventModifier}
         */
        this.modifiers = res?.event?.modifiers ?? null;
        };

        /**
         * This event's ending time as an iso string.
         * @type {string}
         */
        this.startTime = res?.startTime;

        /**
         * This event's ending time as an iso string.
         * @type {string}
         */
        this.endTime = res?.endTime;

        /**
         * This event's slot's id on the api.
         * @type {number}
         */
        this.slot = res?.slotId;
    }
}

function parseISOString(s) {
  var b = s.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
}

module.exports = RotatingEvent;
