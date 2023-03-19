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
         * A date object for an event.
         * @typedef {Object} EventDate
         * @property {string} iso The ISO string for this date.
         * @property {Date} date The date object for this date.
         */

        /**
         * This event's ending time as a date object.
         * @type {EventDate}
         */

        this.startTime = { iso: res?.startTime, date: new Date(Date(res?.startTime)) };

        /**
         * This event's ending time as a date object.
         * @type {EventDate}
         */
        this.endTime = { iso: res?.endTime, date: new Date(Date(res?.startTime)) };

        /**
         * This event's slot's id on the api.
         * @type {number}
         */
        this.slot = res?.slotId;
    }
}

module.exports = RotatingEvent;
