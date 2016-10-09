var preProcessing = function(req) {
    if (!authorizationService.isSecure(req)) {
        return authorizationService.failedAuthorizationResponse;
    }

    authorizationService.captureRequestIdentity(req);

    if (!requestIntegrityService.isValid(req)) {
        return requestIntegrityService.badlyFormattedRequestResponse;
    }

    return req;
}

module.exports = {
    Process: function(req) {
        var executionReadyRequest = preProcessing(req);

        response = requestInterpreter.execute(executionReadyRequest);

        return response;
    }
};