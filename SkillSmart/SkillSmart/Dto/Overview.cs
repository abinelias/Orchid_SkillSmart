using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Overview : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "Summary Required")]
        public string Summary { get; set; }

        [Required(ErrorMessage = "ExperienceId Required")]
        public string ExperienceId { get; set; }

        [Required(ErrorMessage = "SecurityClearance Required")]
        public string SecurityClearanceId{ get; set; }

        [Required(ErrorMessage = "WillingToRelocateId Required")]
        public string WillingToRelocateId { get; set; }

        [Required(ErrorMessage = "TwitterUrl Required")]
        public string TwitterUrl { get; set; }

        [Required(ErrorMessage = "LinkedInUrl Required")]
        public string LinkedInUrl { get; set; }

        [Required(ErrorMessage = "PersonalWebsite Required")]
        public string PersonalWebsite { get; set; }

    }
}
