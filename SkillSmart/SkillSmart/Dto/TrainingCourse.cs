using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class TrainingCourse : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "ProgramTypeId Required")]
        public string ProgramTypeId { get; set; }

        [Required(ErrorMessage = "Focus Required")]
        public string Focus { get; set; }

        [Required(ErrorMessage = "InstitutionName Required")]
        public string InstitutionName { get; set; }

        [Required(ErrorMessage = "CompletionDate Required")]
        public string CompletionDate { get; set; }

        [Required(ErrorMessage = "CurrentlyEnrolled Required")]
        public string CurrentlyEnrolled { get; set; }

        [Required(ErrorMessage = "TrainingDetails Required")]
        public string TrainingDetails { get; set; }

        [Required(ErrorMessage = "Contact Required")]
        public string Contact { get; set; }

        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Phone Required")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Address Required")]
        public string Address { get; set; }

        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }

        [Required(ErrorMessage = "Website Required")]
        public string Website { get; set; }
    }
}
