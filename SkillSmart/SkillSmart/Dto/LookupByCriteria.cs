using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;

namespace SkillSmart.Dto
{
    public class LookupByCriteria : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// Name
        /// </summary>
        [Display(Name = "Name:")]
        [Required(ErrorMessage = "Name Required")]
        public string Name { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [Display(Name = "ParentId:")]
        [Required(ErrorMessage = "ParentId Required")]
        public string ParentId { get; set; }
    }
}
