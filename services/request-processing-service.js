//Load up service dependencies
var securityGuard = require('authorization-service');
var receptionist = require('request-integrity-service');
var processingManager = require('request-interpretation-service');

//Define pre processing steps
var preProcessing = function(req) {
    outcome = {
        content: null,
        error: true
    };

    //Step 1. Check if we recognize source ID. Stamp with session ID and source ID if required. 
    securityGuard.capturesRequestIdentity(req);

    //Step 2. Check if request meets access criteria and/or security rules
    if (!securityGuard.Secures(req)) {
        outcome.content = securityGuard.failedAuthorizationResponse;
        return outcome;
    }

    //Step 3. Check request is in an understandable format 
    if (!receptionist.understands(req)) {
        outcome.content = receptionist.failedAuthorizationResponse;
        return outcome;
    }

    outcome.content = req;
    outcome.error = false;

    return outcome;
}

module.exports = {
    // Execute main processing of request 
    Process: function(req) {
        var preProcessingOutcome = preProcessing(req);

        if (!preProcessingOutcome.error) {
            response = processingManager.execute(preProcessingOutcome);

            return response;
        }

        return preProcessingOutcome.content;
    }
};