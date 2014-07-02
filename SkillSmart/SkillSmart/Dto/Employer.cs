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
        /// FirstName
        /// </summary>
        public string FirstName { get; set; }

        /// <summary>
        /// LastNmae
        /// </summary>
        public string LastNmae { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Password
        /// </summary>
        public string Password { get; set; }

        /// <summary>
        /// Permission
        /// </summary>
        public string Permission { get; set; }

        /// <summary>
        /// Department
        /// </summary>
        public string Department { get; set; }

    }
}
