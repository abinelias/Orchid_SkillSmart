using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ListJobSkills
    {
        public string JobId { get; set; }

        public string SkillMapId { get; set; }

        public string SkillId { get; set; }

        public string SkillName { get; set; }

        public int SkillScore { get; set; }

        public int SkillExperience { get; set; }

        public int SkillImportance { get; set; }

        public string CategoryName { get; set; }

        public string CategoryId { get; set; }

        public string SpecialityName { get; set; }

        public string SpecialityId { get; set; }

        public string Id { get; set; }
    }
}