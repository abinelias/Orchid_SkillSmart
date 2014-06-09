using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

namespace SkillSmartWebAPI.App_Start
{
    public class LoggingHandler : DelegatingHandler
    {
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            if (request.Content != null)
            {
                string requestContent = await request.Content.ReadAsStringAsync();
            }

            HttpResponseMessage response = await base.SendAsync(request, cancellationToken);

            if (response.Content != null)
            {
                string responseContent = await response.Content.ReadAsStringAsync();
            }

            return response;
        }
    }
}