using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Scholarship : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// EducationId
        /// </summary>
        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        /// <summary>
        /// ScholarshipCheck
        /// </summary>
        [Required(ErrorMessage = "Scholarship Required")]
        public string ScholarshipCheck { get; set; }

        /// <summary>
        /// Title
        /// </summary>
        [Required(ErrorMessage = "Title Required")]
        public string Title { get; set; }

        /// <summary>
        /// ScholarshipDescription
        /// </summary>
        [Required(ErrorMessage = "ScholarshipDescription Required")]
        public string ScholarshipDescription { get; set; }

        /// <summary>
        /// Value
        /// </summary>
        [Required(ErrorMessage = "Value Required")]
        public string Value { get; set; }
    }
}
