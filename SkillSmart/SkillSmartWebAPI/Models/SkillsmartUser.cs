using MongoDB.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Web;

namespace SkillSmartWebAPI.Models
{
  public class SkillsmartUser : IdentityUser
  {
    private const string ClaimId = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
    public const string SkillSmartId = "http://www.skillsmart.us/skillsmartid";
    public const string FirstName = "http://www.skillsmart.us/firstname";
    public const string LastName = "http://www.skillsmart.us/lastname";

    public SkillsmartUser()
      : base()
    {
    }

    /// <summary>
    /// Extracts the User Id from the givne claimsPrincipal
    /// </summary>
    /// <param name="user"></param>
    /// <returns></returns>
    public static Guid GUID(IPrincipal user)
    {
      if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
        return Guid.Empty;
      ClaimsPrincipal principal = user as ClaimsPrincipal;
      if (principal != null)
      {
        Claim claim = principal.FindFirst(SkillSmartId);
        if (claim != null)
        {
          return new Guid(claim.Value);
        }
      }
      return Guid.Empty;
    }

    public static string GuidStr(IPrincipal user)
    {
      if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
        return string.Empty;
      ClaimsPrincipal principal = user as ClaimsPrincipal;
      if (principal != null)
      {
        Claim claim = principal.FindFirst(SkillSmartId);
        if (claim != null)
        {
            return claim.Value;
        }
      }
      return string.Empty;

    }

    public static void GetUserInfo(IPrincipal user, out string fname, out string lname, out string email)
    {
      fname = string.Empty;
      lname = string.Empty;
      email = string.Empty;
      if (user == null || user.Identity == null || !user.Identity.IsAuthenticated)
        return;
      ClaimsPrincipal principal = user as ClaimsPrincipal;
      if (principal != null)
      {
        fname = GetClaim(principal, SkillsmartUser.FirstName);
        lname = GetClaim(principal, SkillsmartUser.LastName);
        email = user.Identity.Name;
      }
    }

    private static string GetClaim(ClaimsPrincipal principal, string claimType)
    {
      Claim claim = principal.FindFirst(claimType);
      if (claim != null)
        return claim.Value;
      return string.Empty;
    }

    public string ClaimValue(string claimType)
    {
      IdentityUserClaim claim = this.Claims.FirstOrDefault(c => c.ClaimType == claimType);
      return claim != null ? claim.ClaimValue : string.Empty;
    }
    public void AddClaims(string firstName, string lastName)
    {
      Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.SkillSmartId, ClaimValue = Guid.NewGuid().ToString() });
      Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.FirstName, ClaimValue = firstName });
      Claims.Add(new MongoDB.AspNet.Identity.IdentityUserClaim { ClaimType = SkillsmartUser.LastName, ClaimValue = lastName });
    }
  }
}