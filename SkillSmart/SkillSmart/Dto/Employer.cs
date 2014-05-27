using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Employer : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// CompanyId
        /// </summary>
        public string CompanyId { get; set; }

        /// <summary>
        /// JobseekerId
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// EmployerId
        /// </summary>
        public string LastNmae { get; set; }

        /// <summary>
        /// JobId
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Subject
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Message
        /// </summary>
        public string Permission { get; set; }

    }
}
