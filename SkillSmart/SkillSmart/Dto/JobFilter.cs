using SkillSmart.Base.Entities;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class JobFilter
    {

        /// <summary>
        /// Salary
        /// </summary>
        public List<string> Salary { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        public List<string> Industry { get; set; }

        /// <summary>
        /// EducationalLevel
        /// </summary>
        public List<string> EducationalLevel { get; set; }

        /// <summary>
        /// EmployeementType
        /// </summary>
        public List<string> EmployeementType { get; set; }

        /// <summary>
        /// CarrierLevel
        /// </summary>
        public List<string> CarrierLevel { get; set; }
    }
}
