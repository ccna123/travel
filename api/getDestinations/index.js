const destinations = require("../data/destination.json");

module.exports = async function (context, req) {
    context.res = {
        status: 200,
        body: destinations,
        headers: { "Content-Type": "application/json" },
    };
};
