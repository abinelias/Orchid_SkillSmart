using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobPermission : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// EmployerId
        /// </summary>
        public string EmployerId { get; set; }

        /// <summary>
        /// DateApplied
        /// </summary>
        public string EditPermission { get; set; }

        /// <summary>
        /// CoverLetter
        /// </summary>
        public string ViewPermission { get; set; }

        /// <summary>
        /// CoverLetter
        /// </summary>
        public string ReviewPermission { get; set; }

    }
}
