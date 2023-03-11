/**
 * Represents an error from the Brawl Stars api
 * @extends {Error}
 */
class ApiError extends Error {
    /**
     * @param {*} res Fetched api response
     * @param {*} body Returned api body
     */
    constructor (res, body) {
        super()

        this.name = `ApiError`;
        //this.res = res
        this.url = res.url;
        this.code = res.status;
        //this.headers = res.headers
        
        this.message = JSON.parse(body).message;
    }
}

module.exports = ApiError;