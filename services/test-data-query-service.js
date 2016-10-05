module.exports = {
    execute: function(query) {
        var testData = {
            data: {
                firstName: "Test",
                lastName: "Case",
                credit: "good"
            },
            exists: true
        };

        if (query === 'customer-with-good-credit') {
            return testData;
        };

        if (query === 'customer-with-bad-credit') {
            testData.data.credit = 'bad';
            return testData;
        };

        if (query === 'customer-with-dodgy-first-name') {
            testData.data.firstName = '???';
            return testData;
        };

        if (query === 'customer-with-dodgy-last-name') {
            testData.data.lastName = '???';
            return testData;
        };

        testData.exists = false;

        return testData;
    }
};