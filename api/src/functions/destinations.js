const { app } = require('@azure/functions');
const destinations = require("../../src/data/destination.json");

app.http('destinations', {
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: async (_request, _context) => {
        return { jsonBody: destinations };
    }
});
