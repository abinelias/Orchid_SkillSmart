using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSkills : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// SkillMapId
        /// </summary>
        public string SkillMapId { get; set; }

        /// <summary>
        /// SkillScore
        /// </summary>
        public int SkillScore { get; set; }

        /// <summary>
        /// SkillImportance
        /// </summary>
        public int SkillImportance { get; set; }

        /// <summary>
        /// SkillExperience
        /// </summary>
        public int SkillExperience { get; set; }

        /// <summary>
        /// Required
        /// </summary>
        public int Required { get; set; }
    }
}
