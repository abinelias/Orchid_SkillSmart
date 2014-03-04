using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Skill : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// SkillName
        /// </summary>
        [Required(ErrorMessage = "SkillName Required")]
        public string SkillName { get; set; }

        /// <summary>
        /// Active
        /// </summary>
        [Required(ErrorMessage = "Active Required")]
        public string Active { get; set; }

    }
}
