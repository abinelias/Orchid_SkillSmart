using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class TrainingCourse : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// ProgramTypeId
        /// </summary>
        [Required(ErrorMessage = "ProgramTypeId Required")]
        public string ProgramTypeId { get; set; }

        /// <summary>
        /// Focus
        /// </summary>
        [Required(ErrorMessage = "Focus Required")]
        public string Focus { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [Required(ErrorMessage = "InstitutionName Required")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// CompletionDate
        /// </summary>
        [Required(ErrorMessage = "CompletionDate Required")]
        public string CompletionDate { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [Required(ErrorMessage = "CurrentlyEnrolled Required")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// TrainingDetails
        /// </summary>
        [Required(ErrorMessage = "TrainingDetails Required")]
        public string TrainingDetails { get; set; }

        /// <summary>
        /// Contact
        /// </summary>
        [Required(ErrorMessage = "Contact Required")]
        public string Contact { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [Required(ErrorMessage = "Phone Required")]
        public string Phone { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [Required(ErrorMessage = "Address Required")]
        public string Address { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }

        /// <summary>
        /// Website
        /// </summary>
        [Required(ErrorMessage = "Website Required")]
        public string Website { get; set; }
    }
}
