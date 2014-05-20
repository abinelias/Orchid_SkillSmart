using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSeekerAppliedJobs : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// JobseekerId
        /// </summary>
        public string JobSeekerId { get; set; }

        /// <summary>
        /// DateApplied
        /// </summary>
        public string DateApplied { get; set; }

        /// <summary>
        /// CoverLetter
        /// </summary>
        public string CoverLetter { get; set; }

    }
}
