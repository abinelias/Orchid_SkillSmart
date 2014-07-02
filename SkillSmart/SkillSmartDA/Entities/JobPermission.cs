using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class JobPermission : MongoEntity
    {
        /// <summary>
        /// JobId
        /// </summary>
        [BsonElement("JobId")]
        public string JobId { get; set; }

        /// <summary>
        /// EmployerId
        /// </summary>
        [BsonElement("EmployerId")]
        public string EmployerId { get; set; }

        /// <summary>
        /// EditPermission
        /// </summary>
        [BsonElement("EditPermission")]
        public string EditPermission { get; set; }

        /// <summary>
        /// ViewPermission
        /// </summary>
        [BsonElement("ViewPermission")]
        public string ViewPermission { get; set; }

        /// <summary>
        /// ReviewPermission
        /// </summary>
        [BsonElement("ReviewPermission")]
        public string ReviewPermission { get; set; }

    }
}

