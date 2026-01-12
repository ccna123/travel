using System;
using System.IO;
using System.Net;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Azure.Storage.Queues;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Company.Function;

public class BookingFunction
{
    private readonly ILogger _logger;

    public BookingFunction(ILoggerFactory loggerFactory)
    {
        _logger = loggerFactory.CreateLogger<BookingFunction>();
    }

    [Function("booking")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post")] HttpRequestData req)
    {
        // Auth (SWA)
        if (!req.Headers.TryGetValues("x-ms-client-principal", out _))
        {
            var unauthorized = req.CreateResponse(HttpStatusCode.Unauthorized);
            await unauthorized.WriteStringAsync("Unauthorized");
            return unauthorized;
        }

        var queueName = Environment.GetEnvironmentVariable("QUEUE_NAME");
        var storageConn = Environment.GetEnvironmentVariable("STORAGE_CONNECTION_STRING");

        if (string.IsNullOrEmpty(queueName) || string.IsNullOrEmpty(storageConn))
        {
            _logger.LogError("Missing QUEUE_NAME or STORAGE_CONNECTION_STRING");
            var error = req.CreateResponse(HttpStatusCode.InternalServerError);
            await error.WriteStringAsync("Server configuration error");
            return error;
        }

        var body = await new StreamReader(req.Body).ReadToEndAsync();
        if (string.IsNullOrWhiteSpace(body))
        {
            var bad = req.CreateResponse(HttpStatusCode.BadRequest);
            await bad.WriteStringAsync("Request body is required");
            return bad;
        }

        var message = new
        {
            id = Guid.NewGuid(),
            payload = JsonSerializer.Deserialize<object>(body),
            createdAt = DateTime.UtcNow
        };

        var queueClient = new QueueClient(storageConn, queueName);
        await queueClient.CreateIfNotExistsAsync();

        var json = JsonSerializer.Serialize(message);
        var base64 = Convert.ToBase64String(Encoding.UTF8.GetBytes(json));

        await queueClient.SendMessageAsync(base64);

        var ok = req.CreateResponse(HttpStatusCode.Created);
        await ok.WriteStringAsync("Booking received");
        return ok;
    }
}
