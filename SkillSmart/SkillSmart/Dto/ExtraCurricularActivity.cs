using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ExtraCurricularActivity : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        [Required(ErrorMessage = "Activity Required")]
        public string Activity { get; set; }

        [Required(ErrorMessage = "StartDate Required")]
        public string StartDate { get; set; }

        [Required(ErrorMessage = "EndDate Required")]
        public string EndDate { get; set; }
    }
}
