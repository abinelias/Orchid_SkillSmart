using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Education : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "InstitutionName Required")]
        public string InstitutionName { get; set; }

        [Required(ErrorMessage = "DegreeId Required")]
        public string DegreeId { get; set; }

        [Required(ErrorMessage = "StartDate Required")]
        public string StartDate { get; set; }

        [Required(ErrorMessage = "EndDate Required")]
        public string EndDate { get; set; }

        [Required(ErrorMessage = "MajorFocus Required")]
        public string MajorFocus { get; set; }

        [Required(ErrorMessage = "MinorFocus Required")]
        public string MinorFocus { get; set; }

        [Required(ErrorMessage = "CurrentlyEnrolled Required")]
        public string CurrentlyEnrolled { get; set; }

        [Required(ErrorMessage = "GPA Required")]
        public string GPA { get; set; }
    }
}
