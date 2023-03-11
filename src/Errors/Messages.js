module.exports = {
    "ClientInvalidToken": "An invalid token was provided",
    "ClientMissingParameter": param => `${param} is required, but not provided`,
    "ClientInvalidOption": option => `An invalid option was provided: ${option}`,

    "EndpointMissingParameter": param => `${param} parameter is required, but not provided`,

    "ClassMissingClient": c => `${c.charAt(0).toUpperCase() + c.slice(1)} class requires a client, but not provided`,
    "ClassInvalidClient": c => `This client provided to the ${c.charAt(0).toUpperCase() + c.slice(1)} class is invalid`,
    "ClassMissingResponse": c => `${c.charAt(0).toUpperCase() + c.slice(1)} class requires an api response, but not provided`,
    "ClassInvalidResponse": c => `This api response provided to the ${c.charAt(0).toUpperCase() + c.slice(1)} class is invalid`
}