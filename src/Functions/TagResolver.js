module.exports = {
    /**
     * @method encode
     * Encodes a player or club tag for an endpoint url.
     * @param {string} tag The player or club tag to encode
     * @returns {URLTagResolvable}
     */
    encode(tag) {
        tag = tag.toUpperCase()

        if (tag.startsWith('%23')) return tag;

        if (tag.startsWith('#')) {
            tag = tag.substring(1)
            return '%23' + tag
        } else {
            return '%23' + tag
        }
    },

    /**
     * @method decode
     * Decodes a player or club tag. It also makes non encoded player or club tags (@link TagResolvable TagResolvable).
     * @param {string} tag The player or club tag to decode
     * @returns {TagResolvable}
     */
    decode(tag) {
        tag = tag.toUpperCase()
        
        if (tag.startsWith('#')) return tag;

        if (tag.startsWith('%23')) {
            tag = tag.substring(3)
            return '#' + tag
        } else {
            return '#' + tag
        }
    }

   /**
    * A string which defines a player's or a club's in-game tag.
    * It starts with `#`.
    * It consist of one of these two (not including the starting character):
    * * Only letters
    * * Combination of numbers and letters
    * @typedef {string} TagResolvable
    */

   /**
    * A string which defines a player's or a club's in-game tag.
    * It starts with `%23`.
    * It consist of one of these two (not including the starting character):
    * * Only letters
    * * Combination of numbers and letters
    * @typedef {string} URLTagResolvable
    */
}