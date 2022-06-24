
class Filters {
    filterUser (details) {
        details['__v'] = undefined
        // details["isFriendRequestSent"] = undefined
        // details["isFriendRequestReceived"] = undefined
            
        return details
    }
}

module.exports = new Filters()