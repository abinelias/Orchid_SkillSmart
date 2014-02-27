using SkillSmart.Base.Entities;
using System;
using System.Web.Script.Serialization;
using System.ComponentModel.DataAnnotations;
namespace SkillSmart.Dto
{
    public class AdditionalInformation : IEntity
    {
        public Guid Id { get; set; }

        [Required(ErrorMessage = "JobSeekerId Required")]
        public string JobSeekerId { get; set; }

        [Required(ErrorMessage = "PreferedName Required")]
        public string PreferedName { get; set; }

        [Required(ErrorMessage = "AddressLine1 Required")]
        public string AddressLine1 { get; set; }

        [Required(ErrorMessage = "AddressLine2 Required")]
        public string AddressLine2 { get; set; }

        [Required(ErrorMessage = "City Required")]
        public string City { get; set; }

        [Required(ErrorMessage = "StateId Required")]
        public string StateId { get; set; }

        [Required(ErrorMessage = "CountryId Required")]
        public string CountryId { get; set; }

        [Required(ErrorMessage = "ZipCode Required")]
        public string ZipCode { get; set; }

        [Required(ErrorMessage = "Citizenship Required")]
        public string Citizenship { get; set; }

        [Required(ErrorMessage = "Gender Required")]
        public string Gender { get; set; }

        [Required(ErrorMessage = "HomePhone Required")]
        public string HomePhone { get; set; }

        [Required(ErrorMessage = "Mobile Required")]
        public string Mobile { get; set; }

        [Required(ErrorMessage = "MethodOfContact Required")]
        public string MethodOfContact { get; set; }

        [Required(ErrorMessage = "Birthday Required")]
        public string Birthday { get; set; }

        [Required(ErrorMessage = "RaceId Required")]
        public string RaceId { get; set; }


        /*public string ToString()
        { 
            System.Text.StringBuilder serOut = new System.Text.StringBuilder();
            new JavaScriptSerializer().Serialize(this, serOut);

            return serOut.ToString();
        }*/
    }
}
