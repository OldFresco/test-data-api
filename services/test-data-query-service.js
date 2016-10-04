module.exports = {
    execute: function (query) {
        var testData = {
            data: {
                firstName: "Test",
                lastName: "Case"
            },
            exists: true
        };

        if (query === 'customer-with-good-credit') {
            return testData;
        };

        testData.exists = false;

        return testData;
    }
};