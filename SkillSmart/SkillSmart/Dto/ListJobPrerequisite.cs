using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ListJobPrerequisite
    {
        public string JobId { get; set; }

        public string PrerequisiteId { get; set; }

        public string PrerequisiteName { get; set; }

        public string TypeId { get; set; }

        public string TypeName { get; set; }

        public string PrerequisiteIndustryId { get; set; }

        public string Id { get; set; }

    }
}