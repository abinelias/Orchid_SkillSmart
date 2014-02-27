using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;

namespace SkillSmart.Dto
{
    public class LookupDto : IEntity
    {
        public Guid Id { get; set; }

        [Display(Name = "Name:")]
        [Required(ErrorMessage = "Name Required")]
        public string Name { get; set; }
    }
}
