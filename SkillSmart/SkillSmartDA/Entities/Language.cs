using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Language : MongoEntity
    {
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }

        [BsonElement("LanguageId")]
        public string LanguageId { get; set; }

        [BsonElement("ProficiencyId")]
        public string ProficiencyId { get; set; }

    }
}
