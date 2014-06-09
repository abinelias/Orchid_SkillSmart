using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobPrerequisite : MongoEntity
    {
        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// PrerequisiteTypeName
        /// </summary>
        [BsonElement("PrerequisiteTypeName")]
        public string PrerequisiteTypeName { get; set; }

        /// <summary>
        /// PrerequisiteTypeId
        /// </summary>
        [BsonElement("PrerequisiteTypeId")]
        public string PrerequisiteTypeId { get; set; }

        /// <summary>
        /// Required
        /// </summary>
        [BsonElement("Required")]
        public int Required { get; set; }
    }
}
