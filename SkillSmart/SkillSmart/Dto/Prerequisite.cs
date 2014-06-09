using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Prerequisite : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// PrerequisiteName
        /// </summary>
        [Required(ErrorMessage = "PrerequisiteName Required")]
        public string PrerequisiteName { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [Required(ErrorMessage = "ParentId Required")]
        public string ParentId { get; set; }

    }
}
