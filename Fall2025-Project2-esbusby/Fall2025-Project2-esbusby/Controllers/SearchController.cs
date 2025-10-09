using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class SearchController : ControllerBase
{
    private readonly IConfiguration _config;
    private readonly HttpClient _client;

    public SearchController(IConfiguration config)
    {
        _config = config;
        _client = new HttpClient();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] string query)
    {
        var apiKey = _config["GoogleApiKey"];
        var engineID = _config["GoogleEngineID"];

        var url = $"https://customsearch.googleapis.com/customsearch/v1?key={apiKey}&cx={engineID}&q={Uri.EscapeDataString(query)}&num=10";
        var response = await _client.GetStringAsync(url);

        return Content(response, "application/json");
    }
}
