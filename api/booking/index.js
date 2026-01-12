const { QueueClient } = require("@azure/storage-queue");
const { randomUUID } = require("crypto");

module.exports = async function (context, req) {
    try {
        // 1. Auth check
        const user = context.req.headers["x-ms-client-principal"];
        if (!user) {
            context.res = { status: 401, body: "Unauthorized" };
            return;
        }

        // 2. Env validation (CỰC KỲ QUAN TRỌNG)
        const queueName = process.env.QUEUE_NAME;
        const storageConn = process.env.STORAGE_CONNECTION_STRING;

        context.log("QUEUE_NAME:", queueName);
        context.log("STORAGE_CONNECTION_STRING exists:", !!storageConn);

        if (!queueName) {
            throw new Error("QUEUE_NAME is not defined");
        }
        if (!storageConn) {
            throw new Error("STORAGE_CONNECTION_STRING is not defined");
        }

        // 3. Body validation
        if (!req.body) {
            context.res = {
                status: 400,
                body: "Request body is required"
            };
            return;
        }

        // 4. Init queue client
        const queueClient = new QueueClient(
            storageConn,
            queueName
        );

        await queueClient.createIfNotExists();

        // 5. Build message (add id để trace)
        const message = {
            id: randomUUID(),
            user: JSON.parse(
                Buffer.from(user, "base64").toString("utf8")
            ),
            payload: req.body,
            createdAt: new Date().toISOString()
        };

        // 6. Send message
        await queueClient.sendMessage(
            Buffer.from(JSON.stringify(message)).toString("base64")
        );

        // 7. Response
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
