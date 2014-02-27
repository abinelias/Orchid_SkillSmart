using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Scholarship : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        [Required(ErrorMessage = "Scholarship Required")]
        public string ScholarshipCheck { get; set; }

        [Required(ErrorMessage = "Title Required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "ScholarshipDescription Required")]
        public string ScholarshipDescription { get; set; }

        [Required(ErrorMessage = "Value Required")]
        public string Value { get; set; }
    }
}
