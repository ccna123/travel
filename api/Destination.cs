using System;
using System.IO;
using System.Net;
using System.Threading.Tasks;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Company.Function;

public class DestinationsFunction
{
    [Function("destinations")]
    public async Task<HttpResponseData> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req)
    {
        var filePath = Path.Combine(
            AppContext.BaseDirectory,
            "data",
            "destination.json"
        );

        var json = await File.ReadAllTextAsync(filePath);

        var res = req.CreateResponse(HttpStatusCode.OK);
        res.Headers.Add("Content-Type", "application/json");
        await res.WriteStringAsync(json);

        return res;
    }
}
