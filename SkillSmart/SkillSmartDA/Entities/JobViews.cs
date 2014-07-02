using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobViews : MongoEntity
    {
        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// JobSeekerId
        /// </summary>
        [BsonElement("JobSeekerId")]
        public string JobSeekerId { get; set; }
    }
}

