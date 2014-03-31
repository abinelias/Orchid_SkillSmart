using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ListingJobSeekerSkills 
    {

        [Required(ErrorMessage = "SkillName Required")]
        public string CategoryId { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string CategoryName { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string SpecialityId { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string SpecialityName { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string SkillId { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string SkillName { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string SkillMapId { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string AcquiredId { get; set; }

        [Required(ErrorMessage = "SkillName Required")]
        public string Id { get; set; }

    }
}
