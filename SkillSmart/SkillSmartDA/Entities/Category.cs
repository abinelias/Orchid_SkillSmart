using MongoDB.Bson.Serialization.Attributes;

namespace SkillSmartMongoDA.Entities
{
    [BsonIgnoreExtraElements]
    public class Category : MongoEntity
    {
        /// <summary>
        /// CategoryName
        /// </summary>
        [BsonElement("CategoryName")]
        public string CategoryName { get; set; }

        /// <summary>
        /// ParentId
        /// </summary>
        [BsonElement("ParentId")]
        public string ParentId { get; set; }

    }
}
