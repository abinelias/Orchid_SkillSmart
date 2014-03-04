using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSeekerSkillList : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// SkillMapId
        /// </summary>
        [Required(ErrorMessage = "SkillMapId Required")]
        public string SkillMapId { get; set; }

        /// <summary>
        /// ProficiencyId
        /// </summary>
        [Required(ErrorMessage = "ProficiencyId Required")]
        public string ProficiencyId { get; set; }

        /// <summary>
        /// ExperienceId
        /// </summary>
        [Required(ErrorMessage = "ExperienceId Required")]
        public string ExperienceId { get; set; }

        /// <summary>
        /// SkillAcquiredId
        /// </summary>
        [Required(ErrorMessage = "SkillAcquiredId Required")]
        public string SkillAcquiredId { get; set; }

    }
}
