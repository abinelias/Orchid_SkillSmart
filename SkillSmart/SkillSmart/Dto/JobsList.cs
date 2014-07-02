using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
namespace SkillSmart.Dto
{
    public class JobsList : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobPosition
        /// </summary>
        public string JobPosition { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        public string CompanyId { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        public string CompanyName { get; set; }

        /// <summary>
        /// JobLocation
        /// </summary>
        public string JobLocation { get; set; }

        /// <summary>
        /// PostingDate
        /// </summary>
        public string PostingDate { get; set; }

        /// <summary>
        /// JobViews
        /// </summary>
        public int JobViews { get; set; }

        /// <summary>
        /// ApplicantsNumber
        /// </summary>
        public int ApplicantsNumber { get; set; }

        /// <summary>
        /// ApplicantAverage
        /// </summary>
        public int ApplicantAverage { get; set; }

        /// <summary>
        /// JobSalary
        /// </summary>
        public string JobSalary { get; set; }

        /// <summary>
        /// JobType
        /// </summary>
        public string JobType { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        public string JobDescription { get; set; }

        /// <summary>
        /// StartDate
        /// </summary>
        public DateTime StartDate { get; set; }

        /// <summary>
        /// EndDate
        /// </summary>
        public DateTime EndDate { get; set; }

        /// <summary>
        /// NoOfOpenings
        /// </summary>
        public int NoOfOpenings { get; set; }

        /// <summary>
        /// PublishId
        /// </summary>
        public int PublishId { get; set; }

    }
}
