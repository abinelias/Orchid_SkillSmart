using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class SkillMap : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// SkillId
        /// </summary>
        [Required(ErrorMessage = "SkillId Required")]
        public string SkillId { get; set; }

        /// <summary>
        /// CategoryId
        /// </summary>
        [Required(ErrorMessage = "CategoryId Required")]
        public string CategoryId { get; set; }

    }
}
