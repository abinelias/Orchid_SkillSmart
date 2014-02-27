using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Certification : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("CertificationName")]
        public string CertificationName { get; set; }

        [BsonElement("License")]
        public string License { get; set; }

        [BsonElement("InstitutionName")]
        public string InstitutionName { get; set; }

        [BsonElement("CompletionDate")]
        public string CompletionDate { get; set; }

        [BsonElement("ExpirationDate")]
        public string ExpirationDate { get; set; }

        [BsonElement("CurrentlyEnrolled")]
        public string CurrentlyEnrolled { get; set; }

        [BsonElement("CertificationDetails")]
        public string CertificationDetails { get; set; }

        [BsonElement("Contact")]
        public string Contact { get; set; }

        [BsonElement("Email")]
        public string Email { get; set; }

        [BsonElement("Phone")]
        public string Phone { get; set; }

        [BsonElement("Address")]
        public string Address { get; set; }

        [BsonElement("City")]
        public string City { get; set; }

        [BsonElement("Website")]
        public string Website { get; set; }

    }
}
