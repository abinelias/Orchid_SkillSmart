using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobPrerequisite : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string JobId { get; set; }

        /// <summary>
        /// PrerequisiteTypeName
        /// </summary>
        public string PrerequisiteTypeName { get; set; }

        /// <summary>
        /// PrerequisiteTypeId
        /// </summary>
        public string PrerequisiteTypeId { get; set; }

        /// <summary>
        /// Required
        /// </summary>
        public int Required { get; set; }

        
    }
}
