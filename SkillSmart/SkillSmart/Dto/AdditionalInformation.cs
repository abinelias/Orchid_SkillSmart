using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class AdditionalInformation : IEntity
    {
        public Guid Id { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// MiddleName
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// MiddleName
        /// </summary>
        public string Suffix { get; set; }

        /// <summary>
        /// MiddleName
        /// </summary>
        public string MiddleName { get; set; }

        /// <summary>
        /// PreferedName
        /// </summary>
        public string PreferedName { get; set; }

        /// <summary>
        /// AddressLine1
        /// </summary>
        [Required(ErrorMessage = "AddressLine1 Required")]
        public string AddressLine1 { get; set; }

        /// <summary>
        /// AddressLine2
        /// </summary>
        [Required(ErrorMessage = "AddressLine2 Required")]
        public string AddressLine2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }

        /// <summary>
        /// StateId
        /// </summary>
        [Required(ErrorMessage = "StateId Required")]
        public string StateId { get; set; }

        /// <summary>
        /// CountryId
        /// </summary>
        [Required(ErrorMessage = "CountryId Required")]
        public string CountryId { get; set; }

        /// <summary>
        /// ZipCode
        /// </summary>
        [Required(ErrorMessage = "ZipCode Required")]
        public string ZipCode { get; set; }

        /// <summary>
        /// Citizenship
        /// </summary>
        [Required(ErrorMessage = "Citizenship Required")]
        public string Citizenship { get; set; }

        /// <summary>
        /// Citizenship
        /// </summary>
        public string Gender { get; set; }

        /// <summary>
        /// HomePhone
        /// </summary>
        [Required(ErrorMessage = "HomePhone Required")]
        public string HomePhone { get; set; }

        /// <summary>
        /// Mobile
        /// </summary>
        public string Mobile { get; set; }

        /// <summary>
        /// MethodOfContact
        /// </summary>
        [Required(ErrorMessage = "MethodOfContact Required")]
        public string MethodOfContact { get; set; }

        /// <summary>
        /// Birthday
        /// </summary>
        public string Birthday { get; set; }

        /// <summary>
        /// RaceId
        /// </summary>
        public string RaceId { get; set; }


        /*public string ToString()
        { 
            System.Text.StringBuilder serOut = new System.Text.StringBuilder();
            new JavaScriptSerializer().Serialize(this, serOut);

            return serOut.ToString();
        }*/
    }
}
