using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SkillMap : MongoEntity
    {
        /// <summary>
        /// SkillId
        /// </summary>
        [BsonElement("SkillId")]
        public string SkillId { get; set; }

        /// <summary>
        /// CategoryId
        /// </summary>
        [BsonElement("CategoryId")]
        public string CategoryId { get; set; }

    }
}
