// Errors for handling our Rest API
class ApiError extends Error {

    constructor(...params) {
        super(...params);
        this.name = 'ApiError';
    }
}

module.exports = ApiError;
