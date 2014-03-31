using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SkillsSpeciality 
    {

        /// <summary>
        /// SkillName
        /// </summary>
        [Required(ErrorMessage = "SkillName Required")]
        public string SkillName { get; set; }

        /// <summary>
        /// SkillMapId
        /// </summary>
        [Required(ErrorMessage = "SkillMapId Required")]
        public string SkillMapId { get; set; }

    }
}
