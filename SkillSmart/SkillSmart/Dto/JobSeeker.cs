using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSeeker : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// FirstName
        /// </summary>
        [Display(Name = "First Name:")]
        [Required(ErrorMessage = "Password Required")]
        public string FirstName { get; set; }

        /// <summary>
        /// LastName
        /// </summary>
        [Display(Name = "Last Name:")]
        [Required(ErrorMessage = "Last Required")]
        public string LastName { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Display(Name = "Email:")]
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        /// <summary>
        /// UserName
        /// </summary>
        [Display(Name = "UserName:")]
        [Required(ErrorMessage = "UserName Required")]
        public string UserName { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        [Display(Name = "Password:")]
        [Required(ErrorMessage = "Password Required")]
        public string Password { get; set; }
    }
}
