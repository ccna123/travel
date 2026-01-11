module.exports = async function (context, req) {
    const user = context.req.headers["x-ms-client-principal"];

    if (!user) {
        context.res = { status: 401, body: "Unauthorized" };
        return;
    }

    context.res = {
        status: 201,
        body: {
            message: "Booking received",
            payload: req.body
        }
    };
};
