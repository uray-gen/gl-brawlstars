/**
 * Client error handling for this package.
 */
class ClientError extends Error {
    /**
     * @param {string} reason Client error reason, listed in `Messages.js` file
     */
    constructor(reason, ...args) {
        super(reason, args);

        this.code = reason;
        this.message = require('./Messages')[reason](...args);
    }
}

module.exports = ClientError;