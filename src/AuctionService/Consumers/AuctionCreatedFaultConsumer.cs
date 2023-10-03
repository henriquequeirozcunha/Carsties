using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionCreatedFaultConsumer : IConsumer<Fault<AuctionCreated>>
{
    public async Task Consume(ConsumeContext<Fault<AuctionCreated>> context)
    {
        Console.WriteLine("-----> Consuming fault creation");

        var exception = context.Message.Exceptions.First();

        if (exception.ExceptionType == "System.ArgumentException")
        {
            context.Message.Message.Model = "NOT_ERRORMODEL"; // NOTE: THIS IS AN EXAMPLE OF CHANGE THE MESSAGE FROM THE FAULTY QUEUE.
            await context.Publish(context.Message.Message);
        }
        else
        {
            Console.WriteLine("Not an argumento exception - update error dashboard");
        }
    }
}
