namespace AuctionService.IntegrationTests;

/// <summary>
/// Class used to Share the Database between test cases
/// </summary>
///
[CollectionDefinition("SharedCollection")]
public class SharedFixture : ICollectionFixture<CustomWebAppFactory>
{

}
