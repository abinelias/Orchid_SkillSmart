using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Language : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// LanguageId
        /// </summary>
        [Required(ErrorMessage = "LanguageId Required")]
        public string LanguageId { get; set; }

        /// <summary>
        /// ProficiencyId
        /// </summary>
        [Required(ErrorMessage = "ProficiencyId Required")]
        public string ProficiencyId { get; set; }
    }
}
