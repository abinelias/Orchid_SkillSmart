using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class WorkHistory : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "CompanyName Required")]
        public string CompanyName { get; set; }

        [Required(ErrorMessage = "IndustryId Required")]
        public string IndustryId { get; set; }

        [Required(ErrorMessage = "StartingPosition Required")]
        public string StartingPosition { get; set; }

        [Required(ErrorMessage = "EndingPosition Required")]
        public string EndingPosition { get; set; }

        [Required(ErrorMessage = "StartDate Required")]
        public string StartDate { get; set; }

        [Required(ErrorMessage = "EndDate Required")]
        public string EndDate { get; set; }

        [Required(ErrorMessage = "CurrentJob Required")]
        public string CurrentJob { get; set; }

        [Required(ErrorMessage = "WorkTypeId Required")]
        public string WorkTypeId { get; set; }

        [Required(ErrorMessage = "StartingSalary Required")]
        public string StartingSalary { get; set; }

        [Required(ErrorMessage = "EndingSalary Required")]
        public string EndingSalary { get; set; }

        [Required(ErrorMessage = "JobDuties Required")]
        public string JobDuties { get; set; }

    }
}
