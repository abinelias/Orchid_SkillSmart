using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SkillSupportingMaterial : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// JobSeekerSkillId
        /// </summary>
        [BsonElement("JobSeekerSkillId")]
        public string JobSeekerSkillId { get; set; }

        /// <summary>
        /// MaterialTitle
        /// </summary>
        [BsonElement("MaterialTitle")]
        public string MaterialTitle { get; set; }

        /// <summary>
        /// WebsiteUrl
        /// </summary>
        [BsonElement("WebsiteUrl")]
        public string WebsiteUrl { get; set; }

        /// <summary>
        /// Description
        /// </summary>
        [BsonElement("Description")]
        public string Description { get; set; }
    }
}
