using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class WorkHistory : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [Required(ErrorMessage = "CompanyName Required")]
        public string CompanyName { get; set; }

        /// <summary>
        /// IndustryId
        /// </summary>
        [Required(ErrorMessage = "IndustryId Required")]
        public string IndustryId { get; set; }

        /// <summary>
        /// StartingPosition
        /// </summary>
        [Required(ErrorMessage = "StartingPosition Required")]
        public string StartingPosition { get; set; }

        /// <summary>
        /// EndingPosition
        /// </summary>
        [Required(ErrorMessage = "EndingPosition Required")]
        public string EndingPosition { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [Required(ErrorMessage = "StartDate Required")]
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [Required(ErrorMessage = "EndDate Required")]
        public string EndDate { get; set; }

        /// <summary>
        /// CurrentJob
        /// </summary>
        [Required(ErrorMessage = "CurrentJob Required")]
        public string CurrentJob { get; set; }

        /// <summary>
        /// WorkTypeId
        /// </summary>
        [Required(ErrorMessage = "WorkTypeId Required")]
        public string WorkTypeId { get; set; }

        /// <summary>
        /// StartingSalary
        /// </summary>
        [Required(ErrorMessage = "StartingSalary Required")]
        public string StartingSalary { get; set; }

        /// <summary>
        /// EndingSalary
        /// </summary>
        [Required(ErrorMessage = "EndingSalary Required")]
        public string EndingSalary { get; set; }

        /// <summary>
        /// JobDuties
        /// </summary>
        [Required(ErrorMessage = "JobDuties Required")]
        public string JobDuties { get; set; }

    }
}
