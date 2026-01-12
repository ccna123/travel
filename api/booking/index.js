const { QueueClient } = require("@azure/storage-queue");

function generateId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 10)
    );
}

module.exports = async function (context, req) {
    try {
        const user = context.req.headers["x-ms-client-principal"];
        if (!user) {
            context.res = { status: 401, body: "Unauthorized" };
            return;
        }

        const queueName = process.env.QUEUE_NAME;
        const storageConn = process.env.STORAGE_CONNECTION_STRING;

        if (!queueName) throw new Error("QUEUE_NAME is not defined");
        if (!storageConn) throw new Error("STORAGE_CONNECTION_STRING is not defined");
        if (!req.body) {
            context.res = { status: 400, body: "Request body is required" };
            return;
        }

        const queueClient = new QueueClient(storageConn, queueName);
        await queueClient.createIfNotExists();

        const message = {
            id: generateId(),
            payload: req.body,
            createdAt: new Date().toISOString()
        };

        await queueClient.sendMessage(
            Buffer.from(JSON.stringify(message)).toString("base64")
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
