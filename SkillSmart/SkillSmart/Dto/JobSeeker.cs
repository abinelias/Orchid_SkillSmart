using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSeeker : IEntity
    {
        public Guid Id { get; set; }

        [Display(Name = "First Name:")]
        [Required(ErrorMessage = "Password Required")]
        public string FirstName { get; set; }

        [Display(Name = "Last Name:")]
        [Required(ErrorMessage = "Last Required")]
        public string LastName { get; set; }

        [Display(Name = "Email:")]
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        [Display(Name = "Birthday:")]
        [Required(ErrorMessage = "Birthday Required")]
        public string Birthday { get; set; }

        [Display(Name = "UserName:")]
        [Required(ErrorMessage = "UserName Required")]
        public string UserName { get; set; }

        [Display(Name = "Password:")]
        [Required(ErrorMessage = "Password Required")]
        public string Password { get; set; }

        public string ToString()
        { 
            System.Text.StringBuilder serOut = new System.Text.StringBuilder();
            new JavaScriptSerializer().Serialize(this, serOut);

            return serOut.ToString();
        }
    }
}
