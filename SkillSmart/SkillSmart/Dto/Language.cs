using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Language : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "LanguageId Required")]
        public string LanguageId { get; set; }

        [Required(ErrorMessage = "ProficiencyId Required")]
        public string ProficiencyId { get; set; }
    }
}
