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
    }
}
