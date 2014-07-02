using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Company : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// CompanyName
        /// </summary>
        [Required(ErrorMessage = "CompanyName Required")]
        public string CompanyName { get; set; }

        /// <summary>
        /// CompanyBranch
        /// </summary>
        [Required(ErrorMessage = "CompanyBranch Required")]
        public string CompanyBranch { get; set; }

        /// <summary>
        /// StreetAddress
        /// </summary>
        [Required(ErrorMessage = "StreetAddress Required")]
        public string StreetAddress { get; set; }

        /// <summary>
        /// Address2
        /// </summary>
        [Required(ErrorMessage = "Address2 Required")]
        public string Address2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }

        /// <summary>
        /// State
        /// </summary>
        [Required(ErrorMessage = "State Required")]
        public string State { get; set; }

        /// <summary>
        /// Zip
        /// </summary>
        [Required(ErrorMessage = "Zip Required")]
        public int Zip { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        [Required(ErrorMessage = "Country Required")]
        public string Country { get; set; }

        /// <summary>
        /// Sector
        /// </summary>
        [Required(ErrorMessage = "Sector Required")]
        public string Sector { get; set; }

        /// <summary>
        /// Industry
        /// </summary>
        [Required(ErrorMessage = "Industry Required")]
        public string Industry { get; set; }

        /// <summary>
        /// EmployerSize
        /// </summary>
        [Required(ErrorMessage = "EmployerSize Required")]
        public string EmployerSize { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [Required(ErrorMessage = "Phone Required")]
        public string Phone { get; set; }

        /// <summary>
        /// CompanyURL
        /// </summary>
        [Required(ErrorMessage = "CompanyURL Required")]
        public string CompanyURL { get; set; }

        /// <summary>
        /// CompanyDescription
        /// </summary>
        [Required(ErrorMessage = "CompanyDescription Required")]
        public string CompanyDescription { get; set; }
    }
}
