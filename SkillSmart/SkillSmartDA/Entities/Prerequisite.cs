using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Prerequisite : MongoEntity
    {
        /// <summary>
        /// PrerequisiteName
        /// </summary>
        [BsonElement("PrerequisiteName")]
        public string PrerequisiteName { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [BsonElement("ParentId")]
        public string ParentId { get; set; }

    }
}
