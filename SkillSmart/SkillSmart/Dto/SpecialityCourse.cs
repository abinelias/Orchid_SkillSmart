using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SpecialityCourse : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        [Required(ErrorMessage = "CourseTitle Required")]
        public string CourseTitle { get; set; }

        [Required(ErrorMessage = "CourseDescription Required")]
        public string CourseDescription { get; set; }

        [Required(ErrorMessage = "Grade Required")]
        public string Grade { get; set; }
    }
}
