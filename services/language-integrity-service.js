module.exports = {
    isValid: function(query) {
        if (query.length > 0) {
            return true;
        }
        return false;
    }
};