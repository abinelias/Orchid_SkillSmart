using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class AdditionalInformation : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("PreferedName")]
        public string PreferedName { get; set; }

        [BsonElement("AddressLine1")]
        public string AddressLine1 { get; set; }

        [BsonElement("AddressLine2")]
        public string AddressLine2 { get; set; }

        [BsonElement("City")]
        public string City { get; set; }

        [BsonElement("StateId")]
        public string StateId { get; set; }

        [BsonElement("CountryId")]
        public string CountryId { get; set; }

        [BsonElement("ZipCode")]
        public string ZipCode { get; set; }

        [BsonElement("Citizenship")]
        public string Citizenship { get; set; }

        [BsonElement("Gender")]
        public string Gender { get; set; }

        [BsonElement("HomePhone")]
        public string HomePhone { get; set; }

        [BsonElement("Mobile")]
        public string Mobile { get; set; }

        [BsonElement("MethodOfContact")]
        public string MethodOfContact { get; set; }

        [BsonElement("Birthday")]
        public string Birthday { get; set; }

        [BsonElement("RaceId")]
        public string RaceId { get; set; }
    }

}
