using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class ListJobSeekerMessage 
    {
        public string JobId { get; set; }

        public string JobTitle { get; set; }

        public string JobPostedDate { get; set; }

        public string JobSeekerId { get; set; }

        public string CompanyId { get; set; }

        public string CompanyName { get; set; }

        public string CompanyLocation { get; set; }

        public string EmployerId { get; set; }

        public string EmployerName { get; set; }

        public string MessageID { get; set; }

        public string MessageSubject { get; set; }

        public string MessageDetails { get; set; }

        public string MessageSentDate { get; set; }

        public string SkillScore { get; set; }

    }
}
