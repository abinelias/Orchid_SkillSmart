using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Education : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [Required(ErrorMessage = "InstitutionName Required")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// DegreeId
        /// </summary>
        [Required(ErrorMessage = "DegreeId Required")]
        public string DegreeId { get; set; }

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
        /// MajorFocus
        /// </summary>
        [Required(ErrorMessage = "MajorFocus Required")]
        public string MajorFocus { get; set; }

        /// <summary>
        /// MinorFocus
        /// </summary>
        [Required(ErrorMessage = "MinorFocus Required")]
        public string MinorFocus { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [Required(ErrorMessage = "CurrentlyEnrolled Required")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// GPA
        /// </summary>
        [Required(ErrorMessage = "GPA Required")]
        public string GPA { get; set; }
    }
}
