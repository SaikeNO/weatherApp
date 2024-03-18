using weatherApp.Server.Exceptions;

namespace weatherApp.Server.Middleware;

public class ExceptionHandlingMiddleware(ILogger<ExceptionHandlingMiddleware> logger) : IMiddleware
{

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next.Invoke(context);
        }
        catch(AlreadyExistException alreadyExistException)
        {
            context.Response.StatusCode = 409;
            await context.Response.WriteAsync(alreadyExistException.Message);
        }
        catch(NotFoundException notFoundException)
        {
            context.Response.StatusCode = 404;
            await context.Response.WriteAsync(notFoundException.Message);
        }
        catch(Exception e)
        {
            logger.LogError(e, e.Message);
            context.Response.StatusCode = 500;
            await context.Response.WriteAsync("Someting went wrong");
        }
    }
}
