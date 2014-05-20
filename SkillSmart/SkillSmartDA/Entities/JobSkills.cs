using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobSkills : MongoEntity
    {
        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// SkillMapId
        /// </summary>
        [BsonElement("SkillMapId")]
        public string SkillMapId { get; set; }

        /// <summary>
        /// SkillScore
        /// </summary>
        [BsonElement("SkillScore")]
        public string SkillScore { get; set; }
    }
}
