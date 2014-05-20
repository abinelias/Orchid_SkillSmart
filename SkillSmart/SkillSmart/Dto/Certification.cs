using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class Certification : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CertificationName
        /// </summary>
        [Required(ErrorMessage = "CertificationName Required")]
        public string CertificationName { get; set; }

        /// <summary>
        /// License
        /// </summary>
        [Required(ErrorMessage = "License Required")]
        public string License { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [Required(ErrorMessage = "InstitutionName Required")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// CompletionDate
        /// </summary>
        [Required(ErrorMessage = "CompletionDate Required")]
        public string CompletionDate { get; set; }

        /// <summary>
        /// ExpirationDate
        /// </summary>
        [Required(ErrorMessage = "ExpirationDate Required")]
        public string ExpirationDate { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [Required(ErrorMessage = "CurrentlyEnrolled Required")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// CertificationDetails
        /// </summary>
        [Required(ErrorMessage = "CertificationDetails Required")]
        public string CertificationDetails { get; set; }

        /// <summary>
        /// Contact
        /// </summary>
        [Required(ErrorMessage = "Contact Required")]
        public string Contact { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [Required(ErrorMessage = "Email Required")]
        public string Email { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [Required(ErrorMessage = "Phone Required")]
        public string Phone { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [Required(ErrorMessage = "Address Required")]
        public string Address { get; set; }

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
        /// Website
        /// </summary>
        [Required(ErrorMessage = "Website Required")]
        public string Website { get; set; }
    }
}
