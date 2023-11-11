using AuctionService.Entities;

namespace AuctionService.UnitTests;

public class AuctionEntityTests
{
    [Fact]
    public void HasReservePrice_ReserPriceGtZero_True()
    {
        var auctioon = new Auction { Id = Guid.NewGuid(), ReservePrice = 10 };

        var result = auctioon.HasReservePrice();

        Assert.True(result);
    }

    [Fact]
    public void HasReservePrice_ReserPriceIsZero_False()
    {
        var auctioon = new Auction { Id = Guid.NewGuid(), ReservePrice = 0 };

        var result = auctioon.HasReservePrice();

        Assert.False(result);
    }
}