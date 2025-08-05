
class ErrorResponse {
    constructor()
    {
        this.success = false;
        this.message = "Something went wrong";
        this.data = {};
        this.error = {};
    }
}

module.exports = ErrorResponse