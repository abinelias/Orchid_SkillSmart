using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Overview : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        public string Industry { get; set; }

        /// <summary>
        /// Speciality
        /// </summary>
        public string Speciality { get; set; }


        /// <summary>
        /// Summary
        /// </summary>
        [Required(ErrorMessage = "Summary Required")]
        public string Summary { get; set; }


        /// <summary>
        /// CurrentStatus
        /// </summary>
        [Required(ErrorMessage = "CurrentStatus Required")]
        public string CurrentStatus { get; set; }

        /// <summary>
        /// SecurityClearanceId
        /// </summary>
        [Required(ErrorMessage = "SecurityClearance Required")]
        public string SecurityClearanceId{ get; set; }

        /// <summary>
        /// WillingToRelocateId
        /// </summary>
        [Required(ErrorMessage = "WillingToRelocateId Required")]
        public string WillingToRelocateId { get; set; }

        /// <summary>
        /// TwitterUrl
        /// </summary>
        [Required(ErrorMessage = "TwitterUrl Required")]
        public string TwitterUrl { get; set; }

        /// <summary>
        /// LinkedInUrl
        /// </summary>
        [Required(ErrorMessage = "LinkedInUrl Required")]
        public string LinkedInUrl { get; set; }

        /// <summary>
        /// PersonalWebsite
        /// </summary>
        [Required(ErrorMessage = "PersonalWebsite Required")]
        public string PersonalWebsite { get; set; }

    }
}
