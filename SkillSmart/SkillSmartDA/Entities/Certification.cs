using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Certification : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// CertificationName
        /// </summary>
        [BsonElement("CertificationName")]
        public string CertificationName { get; set; }

        /// <summary>
        /// License
        /// </summary>
        [BsonElement("License")]
        public string License { get; set; }

        /// <summary>
        /// InstitutionName
        /// </summary>
        [BsonElement("InstitutionName")]
        public string InstitutionName { get; set; }

        /// <summary>
        /// CompletionDate
        /// </summary>
        [BsonElement("CompletionDate")]
        public string CompletionDate { get; set; }

        /// <summary>
        /// ExpirationDate
        /// </summary>
        [BsonElement("ExpirationDate")]
        public string ExpirationDate { get; set; }

        /// <summary>
        /// CurrentlyEnrolled
        /// </summary>
        [BsonElement("CurrentlyEnrolled")]
        public string CurrentlyEnrolled { get; set; }

        /// <summary>
        /// CertificationDetails
        /// </summary>
        [BsonElement("CertificationDetails")]
        public string CertificationDetails { get; set; }

        /// <summary>
        /// Contact
        /// </summary>
        [BsonElement("Contact")]
        public string Contact { get; set; }

        /// <summary>
        /// Email
        /// </summary>
        [BsonElement("Email")]
        public string Email { get; set; }

        /// <summary>
        /// Phone
        /// </summary>
        [BsonElement("Phone")]
        public string Phone { get; set; }

        /// <summary>
        /// Address
        /// </summary>
        [BsonElement("Address")]
        public string Address { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [BsonElement("City")]
        public string City { get; set; }

        /// <summary>
        /// Website
        /// </summary>
        [BsonElement("Website")]
        public string Website { get; set; }

    }
}
