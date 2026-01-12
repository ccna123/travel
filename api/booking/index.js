const { QueueClient } = require("@azure/storage-queue");

module.exports = async function (context, req) {
    const user = context.req.headers["x-ms-client-principal"];

    if (!user) {
        context.res = { status: 401, body: "Unauthorized" };
        return;
    }

    const queueClient = new QueueClient(
        process.env.AzureWebJobsStorage,
        process.env.QUEUE_NAME
    );

    await queueClient.createIfNotExists();

    await queueClient.sendMessage(
        Buffer.from(JSON.stringify(req.body)).toString("base64")
    );

    context.res = {
        status: 201,
        body: {
            message: "Booking received",
            payload: req.body
        }
    };
};
