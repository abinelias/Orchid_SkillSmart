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
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CourseName
        /// </summary>
        [Required(ErrorMessage = "CourseName Required")]
        public string CourseName { get; set; }

        /// <summary>
        /// CourseDescription
        /// </summary>
        [Required(ErrorMessage = "CourseDescription Required")]
        public string CourseDescription { get; set; }
    }
}
