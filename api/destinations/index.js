const data = require("./data/destination.json");

module.exports = async function (context) {
    context.res = {
        status: 200,
        body: data
    };
};