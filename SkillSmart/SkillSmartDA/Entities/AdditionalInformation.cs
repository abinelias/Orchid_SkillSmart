using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class AdditionalInformation : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }


        /// <summary>
        /// MiddleName
        /// </summary>
        [BsonElement("Title")]
        public string Title { get; set; }


        /// <summary>
        /// MiddleName
        /// </summary>
        [BsonElement("Suffix")]
        public string Suffix { get; set; }
        
        /// <summary>
        /// MiddleName
        /// </summary>
        [BsonElement("MiddleName")]
        public string MiddleName { get; set; }

        /// <summary>
        /// PreferedName
        /// </summary>
        [BsonElement("PreferedName")]
        public string PreferedName { get; set; }

        /// <summary>
        /// AddressLine1
        /// </summary>
        [BsonElement("AddressLine1")]
        public string AddressLine1 { get; set; }

        /// <summary>
        /// AddressLine2
        /// </summary>
        [BsonElement("AddressLine2")]
        public string AddressLine2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [BsonElement("City")]
        public string City { get; set; }

        /// <summary>
        /// StateId
        /// </summary>
        [BsonElement("StateId")]
        public string StateId { get; set; }

        /// <summary>
        /// CountryId
        /// </summary>
        [BsonElement("CountryId")]
        public string CountryId { get; set; }

        /// <summary>
        /// ZipCode
        /// </summary>
        [BsonElement("ZipCode")]
        public string ZipCode { get; set; }

        /// <summary>
        /// Citizenship
        /// </summary>
        [BsonElement("Citizenship")]
        public string Citizenship { get; set; }

        /// <summary>
        /// Gender
        /// </summary>
        [BsonElement("Gender")]
        public string Gender { get; set; }

        /// <summary>
        /// HomePhone
        /// </summary>
        [BsonElement("HomePhone")]
        public string HomePhone { get; set; }

        /// <summary>
        /// Mobile
        /// </summary>
        [BsonElement("Mobile")]
        public string Mobile { get; set; }

        /// <summary>
        /// MethodOfContact
        /// </summary>
        [BsonElement("MethodOfContact")]
        public string MethodOfContact { get; set; }

        /// <summary>
        /// BirthDate
        /// </summary>
        [BsonElement("BirthDate")]
        public string BirthDate { get; set; }

        /// <summary>
        /// BirthMonth
        /// </summary>
        [BsonElement("BirthMonth")]
        public string BirthMonth { get; set; }

        /// <summary>
        /// BirthYear
        /// </summary>
        [BsonElement("BirthYear")]
        public string BirthYear { get; set; }

        /// <summary>
        /// Notification
        /// </summary>
        [BsonElement("Notification")]
        public string Notification { get; set; }

        /// <summary>
        /// Ethinicity
        /// </summary>
        [BsonElement("Ethinicity")]
        public string Ethinicity { get; set; }

        /// <summary>
        /// ExperienceId
        /// </summary>
        [BsonElement("Experience")]
        public string Experience { get; set; }

        /// <summary>
        /// RaceId
        /// </summary>
        [BsonElement("RaceId")]
        public string RaceId { get; set; }
    }

}
