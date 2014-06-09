using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.Owin;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using Owin;
using SkillSmartWebAPI.Providers;
using MongoDB.AspNet.Identity;
using SkillSmartWebAPI.Models;

namespace SkillSmartWebAPI
{
  public partial class Startup
  {
    static Startup()
    {
      PublicClientId = "SkillSmart";

      UserManagerFactory = () => new UserManager<SkillsmartUser>(new UserStore<SkillsmartUser>());

      OAuthOptions = new OAuthAuthorizationServerOptions
      {
        TokenEndpointPath = new PathString("/Token"),
        Provider = new ApplicationOAuthProvider(PublicClientId, UserManagerFactory),
        AuthorizeEndpointPath = new PathString("/api/Account/ExternalLogin"),
        AccessTokenExpireTimeSpan = TimeSpan.FromDays(1),
        AllowInsecureHttp = true
      };
    }

    public static OAuthAuthorizationServerOptions OAuthOptions { get; private set; }

    public static Func<UserManager<SkillsmartUser>> UserManagerFactory { get; set; }

    public static string PublicClientId { get; private set; }

    public void ConfigureAuth(IAppBuilder app)
    {
      // Enable the application to use a cookie to store information for the signed in user
      // and to use a cookie to temporarily store information about a user logging in with a third party login provider
      app.UseCookieAuthentication(new CookieAuthenticationOptions());
      app.UseExternalSignInCookie(DefaultAuthenticationTypes.ExternalCookie);

      // Enable the application to use bearer tokens to authenticate users
      app.UseOAuthBearerTokens(OAuthOptions);

      // Uncomment the following lines to enable logging in with third party login providers
      //app.UseMicrosoftAccountAuthentication(
      //    clientId: "",
      //    clientSecret: "");

      //app.UseTwitterAuthentication(
      //    consumerKey: "",
      //    consumerSecret: "");

      //app.UseFacebookAuthentication(
      //    appId: "",
      //    appSecret: "");

      app.UseGoogleAuthentication();
    }
  }
}
