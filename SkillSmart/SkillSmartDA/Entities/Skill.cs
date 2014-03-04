using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Skill : MongoEntity
    {
        /// <summary>
        /// SkillName
        /// </summary>
        [BsonElement("SkillName")]
        public string SkillName { get; set; }

        /// <summary>
        /// Active
        /// </summary>
        [BsonElement("Active")]
        public string Active { get; set; }

    }
}
