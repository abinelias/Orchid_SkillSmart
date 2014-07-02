using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using SkillSmartWebAPI.Models;
using SkillSmartWebAPI.Providers;
using SkillSmartWebAPI.Results;
using System.Web.Http.Cors;
using System.Security.Principal;
using SkillSmartWebAPI;

namespace SkillSmartWebAPI.Controllers
{
  [Authorize]
  [RoutePrefix("api/Account")]
  [EnableCors("*", "*", "*")]
  public class AccountController : ApiController
  {
    public enum UserRole
    {
      Member,
      Admin,
      Curator,
      HR,
      Reviewer
    }

    private const string ClaimId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    private const string LocalLoginProvider = "Local";

    /// <summary>
    /// Extracts the User Id from the givne claimsPrincipal
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public static string Id(IPrincipal user)
    {
      if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
        return string.Empty;
      ClaimsPrincipal principal = user as ClaimsPrincipal;
      if (principal != null)
      {
        Claim claim = principal.FindFirst(ClaimId);
        if (claim != null)
          return claim.Value;
      }
      return string.Empty;
    }

    public AccountController()
      : this(Startup.UserManagerFactory(), Startup.OAuthOptions.AccessTokenFormat)
    {
    }

    public AccountController(UserManager<SkillsmartUser> userManager,
        ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
    {
      UserManager = userManager;
      AccessTokenFormat = accessTokenFormat;
    }

    public UserManager<SkillsmartUser> UserManager { get; private set; }
    public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }

    // GET api/Account/UserInfo
    [SkillsmartHostAuth(DefaultAuthenticationTypes.ExternalBearer)]
    [Route("UserInfo")]
    public UserInfoViewModel GetUserInfo()
    {
      ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

      var nm = User.Identity.GetUserName();
      string userEmail = string.Empty;
      string fname = string.Empty;
      string lname = string.Empty;

      if (nm.Contains("@"))
      {
        userEmail = nm;
        if (externalLogin == null)
        {
          // Retrieve user name from the 
          SkillsmartUser user = UserManager.FindByName(userEmail);
          fname = user.Claims.First(c => c.ClaimType == SkillsmartUser.FirstName).ClaimValue;
          lname = user.Claims.First(c => c.ClaimType == SkillsmartUser.LastName).ClaimValue;
        }
      }

      else if (nm.Contains(" "))
      {
        string[] tokens = nm.Split(' ');
        fname = tokens[0];
        if (tokens.Length > 1)
          lname = tokens[1];
      }
      return new UserInfoViewModel
      {
        email = userEmail,
        firstName = fname,
        lastName = lname,
        hasRegistered = externalLogin == null,
        loginProvider = externalLogin != null ? externalLogin.LoginProvider : null
      };
    }

    // POST api/Account/Logout
    [Route("Logout")]
    public IHttpActionResult Logout()
    {
      Authentication.SignOut(CookieAuthenticationDefaults.AuthenticationType);
      return Ok();
    }

    // GET api/Account/ManageInfo?returnUrl=%2F&generateState=true
    [Route("ManageInfo")]
    public async Task<ManageInfoViewModel> GetManageInfo(string returnUrl, bool generateState = false)
    {
      SkillsmartUser user = await UserManager.FindByIdAsync(User.Identity.GetUserId());

      if (user == null)
      {
        return null;
      }

      List<UserLoginInfoViewModel> logins = new List<UserLoginInfoViewModel>();

      foreach (Microsoft.AspNet.Identity.UserLoginInfo linkedAccount in user.Logins)
      {
        logins.Add(new UserLoginInfoViewModel
        {
          loginProvider = linkedAccount.LoginProvider,
          providerKey = linkedAccount.ProviderKey
        });
      }

      if (user.PasswordHash != null)
      {
        logins.Add(new UserLoginInfoViewModel
        {
          loginProvider = LocalLoginProvider,
          providerKey = user.UserName,
        });
      }

      return new ManageInfoViewModel
      {
        localLoginProvider = LocalLoginProvider,
        email = user.UserName,
        logins = logins,
        externalLoginProviders = GetExternalLogins(returnUrl, generateState)
      };
    }

    // POST api/Account/ChangePassword
    [Route("ChangePassword")]
    public async Task<IHttpActionResult> ChangePassword(ChangePasswordBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      IdentityResult result = await UserManager.ChangePasswordAsync(User.Identity.GetUserId(), model.oldPassword,
          model.newPassword);
      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    // POST api/Account/SetPassword
    [Route("SetPassword")]
    public async Task<IHttpActionResult> SetPassword(SetPasswordBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      IdentityResult result = await UserManager.AddPasswordAsync(User.Identity.GetUserId(), model.newPassword);
      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    // POST api/Account/AddExternalLogin
    [Route("AddExternalLogin")]
    public async Task<IHttpActionResult> AddExternalLogin(AddExternalLoginBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);

      AuthenticationTicket ticket = AccessTokenFormat.Unprotect(model.ExternalAccessToken);

      if (ticket == null || ticket.Identity == null || (ticket.Properties != null
          && ticket.Properties.ExpiresUtc.HasValue
          && ticket.Properties.ExpiresUtc.Value < DateTimeOffset.UtcNow))
      {
        return BadRequest("External login failure.");
      }

      ExternalLoginData externalData = ExternalLoginData.FromIdentity(ticket.Identity);

      if (externalData == null)
      {
        return BadRequest("The external login is already associated with an account.");
      }

      IdentityResult result = await UserManager.AddLoginAsync(User.Identity.GetUserId(),
          new UserLoginInfo(externalData.LoginProvider, externalData.ProviderKey));

      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    // POST api/Account/RemoveLogin
    [Route("RemoveLogin")]
    public async Task<IHttpActionResult> RemoveLogin(RemoveLoginBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      IdentityResult result;

      if (model.loginProvider == LocalLoginProvider)
      {
        result = await UserManager.RemovePasswordAsync(User.Identity.GetUserId());
      }
      else
      {
        result = await UserManager.RemoveLoginAsync(User.Identity.GetUserId(),
            new UserLoginInfo(model.loginProvider, model.providerKey));
      }

      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    // GET api/Account/ExternalLogin
    [OverrideAuthentication]
    [HostAuthentication(DefaultAuthenticationTypes.ExternalCookie)]
    [AllowAnonymous]
    [Route("ExternalLogin", Name = "ExternalLogin")]
    public async Task<IHttpActionResult> GetExternalLogin(string provider, string error = null)
    {
      if (error != null)
      {
        return Redirect(Url.Content("~/") + "#error=" + Uri.EscapeDataString(error));
      }

      if (!User.Identity.IsAuthenticated)
      {
        return new ChallengeResult(provider, this);
      }

      ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

      if (externalLogin == null)
      {
        return InternalServerError();
      }

      if (externalLogin.LoginProvider != provider)
      {
        Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
        return new ChallengeResult(provider, this);
      }

      SkillsmartUser user = await UserManager.FindAsync(new UserLoginInfo(externalLogin.LoginProvider,
          externalLogin.ProviderKey));

      bool hasRegistered = user != null;

      if (hasRegistered)
      {
        Authentication.SignOut(DefaultAuthenticationTypes.ExternalCookie);
        ClaimsIdentity oAuthIdentity = await UserManager.CreateIdentityAsync(user,
            OAuthDefaults.AuthenticationType);
        ClaimsIdentity cookieIdentity = await UserManager.CreateIdentityAsync(user,
            CookieAuthenticationDefaults.AuthenticationType);
        AuthenticationProperties properties = ApplicationOAuthProvider.CreateProperties(user);
        Authentication.SignIn(properties, oAuthIdentity, cookieIdentity);
      }
      else
      {
        IEnumerable<Claim> claims = externalLogin.GetClaims();
        ClaimsIdentity identity = new ClaimsIdentity(claims, OAuthDefaults.AuthenticationType);
        Authentication.SignIn(identity);
      }

      return Ok();
    }

    // GET api/Account/ExternalLogins?returnUrl=%2F&generateState=true
    [AllowAnonymous]
    [Route("ExternalLogins")]
    public IEnumerable<ExternalLoginViewModel> GetExternalLogins(string returnUrl, bool generateState = false)
    {
      IEnumerable<AuthenticationDescription> descriptions = Authentication.GetExternalAuthenticationTypes();
      List<ExternalLoginViewModel> logins = new List<ExternalLoginViewModel>();

      string state;

      if (generateState)
      {
        const int strengthInBits = 256;
        state = RandomOAuthStateGenerator.Generate(strengthInBits);
      }
      else
      {
        state = null;
      }

      foreach (AuthenticationDescription description in descriptions)
      {
        ExternalLoginViewModel login = new ExternalLoginViewModel
        {
          name = description.Caption,
          url = Url.Route("ExternalLogin", new
          {
            provider = description.AuthenticationType,
            response_type = "token",
            client_id = Startup.PublicClientId,
            redirect_uri = new Uri(Request.RequestUri, returnUrl).AbsoluteUri,
            state = state
          }),
          state = state
        };
        if (login.url[0] == '/')
          login.url = login.url.Substring(1, login.url.Length - 1);
        logins.Add(login);
      }

      return logins;
    }

    // POST api/Account/Register
    [AllowAnonymous]
    [Route("Register")]
    public async Task<IHttpActionResult> Register(RegisterBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      SkillsmartUser user = new SkillsmartUser
      {
        UserName = model.email
      };
      user.Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.SkillSmartId, ClaimValue = Guid.NewGuid().ToString() });
      user.Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.FirstName, ClaimValue = model.firstName });
      user.Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.LastName, ClaimValue = model.lastName });
      user.Roles.Add(UserRole.Member.ToString());
      IdentityResult result = await UserManager.CreateAsync(user, model.password);
      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    // POST api/Account/RegisterExternal
    [OverrideAuthentication]
    [HostAuthentication(DefaultAuthenticationTypes.ExternalBearer)]
    [Route("RegisterExternal")]
    public async Task<IHttpActionResult> RegisterExternal(RegisterExternalBindingModel model)
    {
      if (!ModelState.IsValid)
      {
        return BadRequest(ModelState);
      }

      ExternalLoginData externalLogin = ExternalLoginData.FromIdentity(User.Identity as ClaimsIdentity);

      if (externalLogin == null)
      {
        return InternalServerError();
      }

      SkillsmartUser user = new SkillsmartUser
      {
        UserName = model.email
      };
      user.AddClaims(model.firstName, model.lastName);
      user.Roles.Add(UserRole.Member.ToString());
      user.Logins.Add(new UserLoginInfo(externalLogin.LoginProvider, externalLogin.ProviderKey));

      IdentityResult result = await UserManager.CreateAsync(user);
      IHttpActionResult errorResult = GetErrorResult(result);

      if (errorResult != null)
      {
        return errorResult;
      }

      return Ok();
    }

    protected override void Dispose(bool disposing)
    {
      if (disposing)
      {
        UserManager.Dispose();
      }

      base.Dispose(disposing);
    }

    #region Helpers

    private IAuthenticationManager Authentication
    {
      get { return Request.GetOwinContext().Authentication; }
    }

    private IHttpActionResult GetErrorResult(IdentityResult result)
    {
      if (result == null)
      {
        return InternalServerError();
      }

      if (!result.Succeeded)
      {
        if (result.Errors != null)
        {
          foreach (string error in result.Errors)
          {
            ModelState.AddModelError("", error);
          }
        }

        if (ModelState.IsValid)
        {
          // No ModelState errors are available to send, so just return an empty BadRequest.
          return BadRequest();
        }

        return BadRequest(ModelState);
      }

      return null;
    }

    private class ExternalLoginData
    {
      public string LoginProvider { get; set; }
      public string ProviderKey { get; set; }
      public string UserName { get; set; }

      public IList<Claim> GetClaims()
      {
        IList<Claim> claims = new List<Claim>();
        claims.Add(new Claim(ClaimTypes.NameIdentifier, ProviderKey, null, LoginProvider));

        if (UserName != null)
        {
          claims.Add(new Claim(ClaimTypes.Name, UserName, null, LoginProvider));
        }

        return claims;
      }

      public static ExternalLoginData FromIdentity(ClaimsIdentity identity)
      {
        if (identity == null)
        {
          return null;
        }

        Claim providerKeyClaim = identity.FindFirst(ClaimTypes.NameIdentifier);

        if (providerKeyClaim == null || String.IsNullOrEmpty(providerKeyClaim.Issuer)
            || String.IsNullOrEmpty(providerKeyClaim.Value))
        {
          return null;
        }

        if (providerKeyClaim.Issuer == ClaimsIdentity.DefaultIssuer)
        {
          return null;
        }

        return new ExternalLoginData
        {
          LoginProvider = providerKeyClaim.Issuer,
          ProviderKey = providerKeyClaim.Value,
          UserName = identity.FindFirstValue(ClaimTypes.Name)
        };
      }
    }

    private static class RandomOAuthStateGenerator
    {
      private static RandomNumberGenerator _random = new RNGCryptoServiceProvider();

      public static string Generate(int strengthInBits)
      {
        const int bitsPerByte = 8;

        if (strengthInBits % bitsPerByte != 0)
        {
          throw new ArgumentException("strengthInBits must be evenly divisible by 8.", "strengthInBits");
        }

        int strengthInBytes = strengthInBits / bitsPerByte;

        byte[] data = new byte[strengthInBytes];
        _random.GetBytes(data);
        return HttpServerUtility.UrlTokenEncode(data);
      }
    }

    #endregion
  }
}
