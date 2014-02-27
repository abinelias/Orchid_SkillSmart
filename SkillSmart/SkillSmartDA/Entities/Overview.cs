using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Overview : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("Summary")]
        public string Summary { get; set; }

        [BsonElement("ExperienceId")]
        public string ExperienceId { get; set; }

        [BsonElement("SecurityClearanceId")]
        public string SecurityClearanceId { get; set; }

        [BsonElement("WillingToRelocateId")]
        public string WillingToRelocateId { get; set; }

        [BsonElement("TwitterUrl")]
        public string TwitterUrl { get; set; }

        [BsonElement("LinkedInUrl")]
        public string LinkedInUrl { get; set; }

        [BsonElement("PersonalWebsite")]
        public string PersonalWebsite { get; set; }
    }

}
