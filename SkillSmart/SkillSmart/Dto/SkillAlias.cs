using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SkillAlias : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// SkillId
        /// </summary>
        [Required(ErrorMessage = "Active Required")]
        public string SkillId { get; set; }

        /// <summary>
        /// AlternativeName
        /// </summary>
        [Required(ErrorMessage = "Active Required")]
        public string AlternativeName { get; set; }

        /// <summary>
        /// Active
        /// </summary>
        [Required(ErrorMessage = "Active Required")]
        public string Active { get; set; }

    }
}
