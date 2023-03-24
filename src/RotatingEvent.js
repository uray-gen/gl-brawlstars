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
         * @type {Date}
         */
        this.startTime = BrawlTZParse(res?.startTime);

        /**
         * This event's ending time as an iso string.
         * @type {Date}
         */
        this.endTime = BrawlTZParse(res?.endTime);

        /**
         * This event's slot's id on the api.
         * @type {number}
         */
        this.slot = res?.slotId;
    }
}

function BrawlTZParse(string) {
    let year = string.substring(0, 4);
    let month = string.substring(4, 6);
    let day = string.substring(6, 8);
    let hour = string.substring(9, 11);
    let minute = string.substring(11, 13);
    let second = string.substring(13, 15);
    let ms = string.substring(16, 19);

    return new Date(year,month,day,hour,minute,second,ms);
}

module.exports = RotatingEvent;
