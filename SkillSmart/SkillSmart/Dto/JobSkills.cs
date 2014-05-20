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
        public string SkillScore { get; set; }

        
    }
}
