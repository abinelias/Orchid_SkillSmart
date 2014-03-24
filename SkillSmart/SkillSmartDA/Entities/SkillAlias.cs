using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class SkillAlias : MongoEntity
    {
        /// <summary>
        /// SkillId
        /// </summary>
        [BsonElement("SkillId")]
        public string SkillId { get; set; }

        /// <summary>
        /// AlternativeName
        /// </summary>
        [BsonElement("AlternativeName")]
        public string AlternativeName { get; set; }

        /// <summary>
        /// Active
        /// </summary>
        [BsonElement("Active")]
        public string Active { get; set; }

     }

}
