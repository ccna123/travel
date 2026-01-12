const { QueueClient } = require("@azure/storage-queue");

module.exports = async function (context, req) {
    try {
        const user = context.req.headers["x-ms-client-principal"];
        if (!user) {
            context.res = { status: 401, body: "Unauthorized" };
            return;
        }

        context.log("QUEUE_NAME:", process.env.QUEUE_NAME);
        context.log("STORAGE:", !!process.env.AzureWebJobsStorage);

        if (!process.env.QUEUE_NAME) {
            throw new Error("QUEUE_NAME is not defined");
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
            body: { message: "Booking received" }
        };
    } catch (err) {
        context.log.error("BOOKING ERROR:", err);
        context.res = {
            status: 500,
            body: err.message || "Internal Server Error"
        };
    }
};

