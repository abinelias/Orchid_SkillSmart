using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Category : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// CategoryName
        /// </summary>
        [Required(ErrorMessage = "CategoryName Required")]
        public string CategoryName { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [Required(ErrorMessage = "ParentId Required")]
        public string ParentId { get; set; }

    }
}
