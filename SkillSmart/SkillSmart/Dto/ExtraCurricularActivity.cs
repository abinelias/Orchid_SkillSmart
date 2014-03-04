using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ExtraCurricularActivity : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// EducationId
        /// </summary>
        [Required(ErrorMessage = "EducationId Required")]
        public string EducationId { get; set; }

        /// <summary>
        /// Activity
        /// </summary>
        [Required(ErrorMessage = "Activity Required")]
        public string Activity { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        [Required(ErrorMessage = "StartDate Required")]
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        [Required(ErrorMessage = "EndDate Required")]
        public string EndDate { get; set; }
    }
}
