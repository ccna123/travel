const { app } = require('@azure/functions');

const destinations = require("../../../src/data/destination.json");


app.http('getDestination', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);
        return { jsonBody: destinations };
    }
});
