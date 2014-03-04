using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Overview : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// Summary
        /// </summary>
        [BsonElement("Summary")]
        public string Summary { get; set; }

        /// <summary>
        /// ExperienceId
        /// </summary>
        [BsonElement("ExperienceId")]
        public string ExperienceId { get; set; }

        /// <summary>
        /// SecurityClearanceId
        /// </summary>
        [BsonElement("SecurityClearanceId")]
        public string SecurityClearanceId { get; set; }

        /// <summary>
        /// WillingToRelocateId
        /// </summary>
        [BsonElement("WillingToRelocateId")]
        public string WillingToRelocateId { get; set; }

        /// <summary>
        /// TwitterUrl
        /// </summary>
        [BsonElement("TwitterUrl")]
        public string TwitterUrl { get; set; }

        /// <summary>
        /// LinkedInUrl
        /// </summary>
        [BsonElement("LinkedInUrl")]
        public string LinkedInUrl { get; set; }

        /// <summary>
        /// PersonalWebsite
        /// </summary>
        [BsonElement("PersonalWebsite")]
        public string PersonalWebsite { get; set; }
    }

}
