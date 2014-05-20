using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SavedJobSearch : IEntity
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
        public string SearchName { get; set; }

        /// <summary>
        /// EmployeementType
        /// </summary>
        [Required(ErrorMessage = "EmployeementType Required")]
        public string EmployeementType { get; set; }

        /// <summary>
        /// Distance
        /// </summary>
        [Required(ErrorMessage = "Distance Required")]
        public string Distance { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        [Required(ErrorMessage = "Industry Required")]
        public string Industry { get; set; }

        /// <summary>
        /// Salary
        /// </summary>
        [Required(ErrorMessage = "Salary Required")]
        public string Salary { get; set; }

        /// <summary>
        /// carrierLevel
        /// </summary>
        [Required(ErrorMessage = "carrierLevel Required")]
        public string carrierLevel { get; set; }

        /// <summary>
        /// EducationLevel
        /// </summary>
        [Required(ErrorMessage = "EducationLevel Required")]
        public string EducationLevel { get; set; }

       
    }
}
