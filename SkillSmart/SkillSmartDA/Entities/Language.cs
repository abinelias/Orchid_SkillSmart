using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Language : MongoEntity
    {
        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        /// <summary>
        /// LanguageId
        /// </summary>
        [BsonElement("LanguageId")]
        public string LanguageId { get; set; }

        /// <summary>
        /// ProficiencyId
        /// </summary>
        [BsonElement("ProficiencyId")]
        public string ProficiencyId { get; set; }

    }
}
