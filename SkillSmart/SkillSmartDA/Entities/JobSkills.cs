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
        public int SkillScore { get; set; }

        /// <summary>
        /// SkillImportance
        /// </summary>
        [BsonElement("SkillImportance")]
        public int SkillImportance { get; set; }

        /// <summary>
        /// SkillExperience
        /// </summary>
        [BsonElement("SkillExperience")]
        public int SkillExperience { get; set; }
    }
}
