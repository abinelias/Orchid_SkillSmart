using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SpecialityCourse : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// EducationId
        /// </summary>
        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        /// <summary>
        /// CourseTitle
        /// </summary>
        [Required(ErrorMessage = "CourseTitle Required")]
        public string CourseTitle { get; set; }

        /// <summary>
        /// CourseDescription
        /// </summary>
        [Required(ErrorMessage = "CourseDescription Required")]
        public string CourseDescription { get; set; }

        /// <summary>
        /// Grade
        /// </summary>
        [Required(ErrorMessage = "Grade Required")]
        public string Grade { get; set; }
    }
}
