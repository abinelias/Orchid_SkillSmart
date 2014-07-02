using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobViews : IEntity
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

    }
}
