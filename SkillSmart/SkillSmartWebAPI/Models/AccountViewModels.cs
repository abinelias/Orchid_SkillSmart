using System;
using System.Collections.Generic;

namespace SkillSmartWebAPI.Models
{
  // Models returned by AccountController actions.

  public class ExternalLoginViewModel
  {
    public string name { get; set; }

    public string url { get; set; }

    public string state { get; set; }
  }

  public class ManageInfoViewModel
  {
    public string localLoginProvider { get; set; }

    public string email { get; set; }

    public IEnumerable<UserLoginInfoViewModel> logins { get; set; }

    public IEnumerable<ExternalLoginViewModel> externalLoginProviders { get; set; }
  }

  public class UserInfoViewModel
  {
    public string email { get; set; }

    public string firstName { get; set; }
    public string lastName { get; set; }
    public bool hasRegistered { get; set; }

    public string loginProvider { get; set; }
  }

  public class UserLoginInfoViewModel
  {
    public string loginProvider { get; set; }

    public string providerKey { get; set; }
  }
}
