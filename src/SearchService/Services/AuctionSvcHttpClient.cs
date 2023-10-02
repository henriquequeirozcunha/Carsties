using MongoDB.Entities;
using SearchService.Models;

namespace SearchService;

public class AuctionSvcHttpClient
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public AuctionSvcHttpClient(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<List<Item>> GetItemsForSearchDb()
    {
        var auctionServiceBaseUrl = _config["AuctionServiceUrl"];

        var lastUpdated = await DB.Find<Item, string>()
            .Sort(x => x.Descending(x => x.UpdatedAt))
            .Project(x => x.UpdatedAt.ToString())
            .ExecuteFirstAsync();

        var url = $"{auctionServiceBaseUrl}/api/auctions?date={lastUpdated}";

        return await _httpClient.GetFromJsonAsync<List<Item>>(url);
    }
}
