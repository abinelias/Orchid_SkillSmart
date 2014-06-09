using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace SkillSmartWebAPI.Models
{
  // Models used as parameters to AccountController actions.

  public class AddExternalLoginBindingModel
  {
    [Required]
    [Display(Name = "External access token")]
    public string ExternalAccessToken { get; set; }
  }

  public class ChangePasswordBindingModel
  {
    [Required]
    [DataType(DataType.Password)]
    [Display(Name = "Current password")]
    public string oldPassword { get; set; }

    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "New Password")]
    public string newPassword { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm new password")]
    [Compare("newPassword", ErrorMessage = "The new password and confirmation password do not match.")]
    public string confirmPassword { get; set; }
  }

  public class RegisterBindingModel
  {
    [Required]
    [Display(Name = "email")]
    public string email { get; set; }

    [Display(Name = "firstName")]
    public string firstName { get; set; }

    [Display(Name = "lastName")]
    public string lastName { get; set; }
    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "password")]
    public string password { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm password")]
    [Compare("password", ErrorMessage = "The password and confirmation password do not match.")]
    public string confirmPassword { get; set; }
  }

  public class RegisterExternalBindingModel
  {
    [Display(Name = "First name")]
    public string firstName { get; set; }
    [Display(Name = "Last name")]
    public string lastName { get; set; }
    [Required]
    [Display(Name = "Email")]
    public string email { get; set; }
  }

  public class RemoveLoginBindingModel
  {
    [Required]
    [Display(Name = "Login provider")]
    public string loginProvider { get; set; }

    [Required]
    [Display(Name = "Provider key")]
    public string providerKey { get; set; }
  }

  public class SetPasswordBindingModel
  {
    [Required]
    [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
    [DataType(DataType.Password)]
    [Display(Name = "New password")]
    public string newPassword { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm new password")]
    [Compare("newPassword", ErrorMessage = "The new password and confirmation password do not match.")]
    public string confirmPassword { get; set; }
  }
}
