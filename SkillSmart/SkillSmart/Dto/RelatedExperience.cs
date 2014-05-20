using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class RelatedExperience : IEntity
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
        /// CompanyName
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// Position
        /// </summary>
        public string Position { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        public string StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        public string EndDate { get; set; }
    }
}
