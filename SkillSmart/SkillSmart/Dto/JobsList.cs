using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
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
        public string JobViews { get; set; }

        /// <summary>
        /// ApplicantsNumber
        /// </summary>
        public string ApplicantsNumber { get; set; }

        /// <summary>
        /// ApplicantAverage
        /// </summary>
        public string ApplicantAverage { get; set; }

        /// <summary>
        /// JobSalary
        /// </summary>
        public string JobSalary { get; set; }

        /// <summary>
        /// JobDescription
        /// </summary>
        public string JobDescription { get; set; }

    }
}
