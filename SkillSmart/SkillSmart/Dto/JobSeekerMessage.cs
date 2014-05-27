using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobSeekerMessage : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobseekerId
        /// </summary>
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        public string CompanyId { get; set; }

        /// <summary>
        /// EmployerId
        /// </summary>
        public string EmployerId { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// Subject
        /// </summary>
        public string Subject { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        public string Message { get; set; }

        /// <summary>
        /// Date
        /// </summary>
        public string Date { get; set; }

    }
}
