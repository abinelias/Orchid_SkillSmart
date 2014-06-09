using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Filters;

namespace SkillSmartWebAPI
{
  public class SkillsmartHostAuth : Attribute, IAuthenticationFilter, IFilter
  {
    private HostAuthenticationAttribute haa;

    // Summary:
    //     Initializes a new instance of the System.Web.Http.HostAuthenticationAttribute
    //     class.
    //
    // Parameters:
    //   authenticationType:
    //     The authentication type of the OWIN middleware to use.
    public SkillsmartHostAuth(string authenticationType)
    {
      haa = new HostAuthenticationAttribute(authenticationType);
    }

    public bool AllowMultiple { get; set; }
    //
    // Summary:
    //     Gets the authentication type of the OWIN middleware to use.
    public string AuthenticationType { get; set; }

    public Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
    {
      return haa.AuthenticateAsync(context, cancellationToken);
    }
    public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
    {
      return haa.ChallengeAsync(context, cancellationToken);
    }
  }

}