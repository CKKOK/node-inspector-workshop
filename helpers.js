function dbCallback(callback) {
    return (error, result) => {
        if (error) {
            throw new Error(error);
        } else {
            callback(result);
        }
    }
}

module.exports = {
    dbCallback
}