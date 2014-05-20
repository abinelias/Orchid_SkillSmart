using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SkillSupportingMaterial : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        public string JobSeekerId { get; set; }

        /// <summary>
        /// JobSeekerSkillId
        /// </summary>
        public string JobSeekerSkillId { get; set; }

        /// <summary>
        /// MaterialTitle
        /// </summary>
        public string MaterialTitle { get; set; }

        /// <summary>
        /// WebsiteUrl
        /// </summary>
        public string WebsiteUrl { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        public string Description { get; set; }
    }
}
