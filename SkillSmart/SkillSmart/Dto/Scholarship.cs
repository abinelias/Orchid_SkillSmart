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
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// ScholarshipOrganization
        /// </summary>
        [Required(ErrorMessage = "ScholarshipOrganization Required")]
        public string ScholarshipOrganization { get; set; }

        /// <summary>
        /// Title
        /// </summary>
        [Required(ErrorMessage = "Title Required")]
        public string ScholarshipTitle { get; set; }

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
